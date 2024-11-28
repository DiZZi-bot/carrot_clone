"use server";

import { typeToFlattenedError, z } from "zod";

const MIN_USERNAME_LENGTH = 5;
const MIN_PASSWORD_LENGTH = 10;

const PASSWORD_REGEX = new RegExp(/^(?=.*[a-z])(?=.*\d).+$/);

const formScheme = z.object({
  email: z
    .string({ required_error: "Email is required." })
    .trim()
    .email("Please Enter a valid email address.")
    .toLowerCase()
    .refine(
      (email) => email.includes("@zod.com"),
      "Only @zod.com emails are allowed"
    ),
  username: z
    .string({
      invalid_type_error: "Username must be a string.",
      required_error: "Username is required.",
    })
    .trim()
    .min(
      MIN_USERNAME_LENGTH,
      `Username should be at least ${MIN_USERNAME_LENGTH} characters long.`
    ),
  password: z
    .string()
    .min(
      MIN_PASSWORD_LENGTH,
      `Password should be at least ${MIN_PASSWORD_LENGTH} characters long.`
    )
    .toLowerCase()
    .regex(PASSWORD_REGEX, "Password should contain at least one number(0~9)."),
});

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<
    { email: string; username: string; password: string },
    string
  > | null;
}

export async function validateAccount(
  _: unknown,
  formData: FormData
): Promise<FormState> {
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formScheme.safeParse(data);
  if (result.success) {
    return {
      error: null,
      isSuccess: true,
    };
  }
  return {
    error: result.error?.flatten(),
    isSuccess: false,
  };
}
