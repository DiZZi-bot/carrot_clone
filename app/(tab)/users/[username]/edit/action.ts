"use server";

import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { typeToFlattenedError, z } from "zod";
import getSession from "@/lib/session";
import { profileSchema } from "@/lib/zodSchema";
import { checkCurrentPassword } from "@/app/service/profile-edit-service";

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<
    {
      email: string;
      username: string;
      password: string;
      newPassword: string;
      bio: string;
    },
    string
  > | null;
}

export async function editProfile(
  _: unknown,
  formData: FormData,
): Promise<FormState> {
  try {
    const data = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      newPassword: formData.get("newPassword"),
      bio: formData.get("bio"),
    };
    const result = await profileSchema.safeParseAsync(data);
    console.log("EditProfile Function!", result);

    if (!result.success) {
      return {
        error: result.error.flatten(),
        isSuccess: false,
      };
    }

    const isValidPassword = await checkCurrentPassword(result.data.password);
    console.log(`isValidPassword: ${isValidPassword}`);

    if (!isValidPassword) {
      return {
        error: {
          fieldErrors: { password: ["Please check your password."] },
          formErrors: [],
        },
        isSuccess: false,
      };
    }

    const session = await getSession();

    if (!session || !session.id) {
      return {
        error: {
          fieldErrors: {},
          formErrors: ["No active session found"],
        },
        isSuccess: false,
      };
    }
    let updatedUser;

    if (result.data.newPassword) {
      updatedUser = await db.user.update({
        where: { id: session.id },
        data: {
          email: result.data.email,
          username: result.data.username,
          password: await bcrypt.hash(result.data.newPassword, 12),
          bio: result.data.bio,
        },
      });
    } else {
      updatedUser = await db.user.update({
        where: { id: session.id },
        data: {
          email: result.data.email,
          username: result.data.username,
          bio: result.data.bio,
        },
      });
    }

    redirect(`/users/${updatedUser.username}`);
  } catch (error) {
    console.error("Profile update error:", error);
    return {
      error: {
        fieldErrors: {},
        formErrors: ["An unexpected error occurred"],
      },
      isSuccess: false,
    };
  }
}
