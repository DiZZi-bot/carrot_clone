"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { typeToFlattenedError, z } from "zod";
import getSession from "@/lib/session";

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user);
};

const loginAccountSchema = z.object({
  email: z
    .string({
      required_error: "Email is required.",
    })
    .trim()
    .email("Please enter a valid email address.")
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exist."),
  password: z.string({
    required_error: "Password is required.",
  }),
});

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<
    { email: string; password: string },
    string
  > | null;
  fieldErrors?: {
    password: string[];
    email: string[];
  };
}

export async function handleLogInForm(
  _: unknown,
  formData: FormData,
): Promise<FormState> {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await loginAccountSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return {
      error: result.error?.flatten(),
      isSuccess: false,
    };
  } else {
    const user = await db.user.findUnique({
      where: { email: result.data.email },
      select: { id: true, password: true },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx",
    );
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/");
    } else {
      return {
        isSuccess: false,
        error: null,
        fieldErrors: {
          password: ["Wrong Password."],
          email: [],
        },
      };
    }
  }
}
