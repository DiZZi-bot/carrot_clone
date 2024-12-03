"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { z, typeToFlattenedError } from "zod";

const createTweetSchema = z.object({
  tweet: z
    .string()
    .trim()
    .min(1, "Tweet cannot be empty")
    .max(280, "Tweet cannot exceed 280 characters."),
});

interface FormState {
  isSuccess: boolean;
  error: typeToFlattenedError<{ tweet: string }, string> | null;
  redirectToLogin?: boolean;
}

export async function handleCreateTweet(
  _: unknown,
  formData: FormData,
): Promise<FormState> {
  const session = await getSession();

  if (!session?.id) {
    return {
      isSuccess: false,
      error: null,
      redirectToLogin: true,
    };
  }

  const data = {
    tweet: formData.get("tweet"),
  };

  const result = await createTweetSchema.safeParseAsync(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return {
      error: result.error?.flatten(),
      isSuccess: false,
    };
  }

  try {
    await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        userId: session.id,
      },
    });
    return {
      isSuccess: true,
      error: null,
    };
  } catch (error) {
    console.error("Error creating tweet:", error);
    return {
      isSuccess: false,
      error: {
        fieldErrors: { tweet: ["Failed to create tweet. Please try again."] },
        formErrors: [],
      },
    };
  }
}
