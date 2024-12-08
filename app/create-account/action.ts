"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { typeToFlattenedError, z } from "zod";
import getSession from "@/lib/session";
import { createAccountSchema } from "@/lib/zodSchema";

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<
    {
      email: string;
      username: string;
      password: string;
      confirm_password: string;
    },
    string
  > | null;
}

export async function handleCreateAccountForm(
  _: unknown,
  formData: FormData,
): Promise<FormState> {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await createAccountSchema.spa(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return {
      error: result.error?.flatten(),
      isSuccess: false,
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        email: result.data.email,
        username: result.data.username,
        password: hashedPassword,
      },
      select: {
        id: true,
      },
    });
    const session = await getSession();
    session.id = user.id;
    await session.save();
    redirect("/");
  }
}
