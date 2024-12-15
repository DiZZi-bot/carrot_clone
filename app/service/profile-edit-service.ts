"use server";

import { getUserPassword } from "./user-service";
import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function checkCurrentPassword(password: string) {
  const user = await getUserPassword();
  const isValidPassword = await bcrypt.compare(password, user!.password);
  return isValidPassword;
}

export async function checkUniqueEmail(email: string, currentUserId?: number) {
  const existingUser = await db.user.findUnique({
    where: {
      email,
      NOT: { id: currentUserId },
    },
  });
  return !existingUser;
}

export async function checkUniqueUsername(
  username: string,
  currentUserId?: number,
) {
  const existingUser = await db.user.findUnique({
    where: {
      username,
      NOT: { id: currentUserId },
    },
  });
  return !existingUser;
}
