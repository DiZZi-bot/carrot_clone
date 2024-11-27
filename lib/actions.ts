"use server";

import { z } from "zod";

const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*\d).+$/);

const formScheme = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(
      (email) => email.includes("@zod.com"),
      "Only @zod.com emails are allowed"
    ),
  username: z
    .string()
    .min(5, "Username should be at least 5 characters long.")
    .trim(),
  password: z
    .string()
    .min(10, "Password should be at least 10 characters long.")
    .toLowerCase()
    .regex(
      passwordRegex,
      "Password should contain at least one number(0123456789)."
    ),
});

export async function validateAccount(prevState: any, formData: FormData) {
  console.log(`prevState: ${prevState}`);
  const data = {
    email: formData.get("email"),
    username: formData.get("username"),
    password: formData.get("password"),
  };
  const result = formScheme.safeParse(data);
  console.log(`result: ${result.success}`);
  console.log(result.error?.flatten().fieldErrors);

  if (!result.success) {
    return result.error.flatten();
  }
}
