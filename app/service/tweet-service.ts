"use server";

import db from "@/lib/db";
import { typeToFlattenedError } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { createTweetSchema } from "@/lib/zodSchema";

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

  let newTweet = null;
  try {
    newTweet = await db.tweet.create({
      data: {
        tweet: result.data.tweet,
        userId: session.id,
      },
    });
    console.log(newTweet);
    return {
      isSuccess: true,
      error: null,
    };
  } catch {
    return {
      isSuccess: false,
      error: {
        fieldErrors: { tweet: ["Failed to create tweet. Please try again."] },
        formErrors: [],
      },
    };
  } finally {
    if (newTweet) {
      redirect(`/tweets/${newTweet.id}`);
    }
  }
}

export async function getTweetDetail(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: {
      user: { select: { username: true } },
      _count: { select: { Response: true } },
    },
  });
  return tweet;
}

export async function getTweetById({
  tweetId,
  userId,
}: {
  tweetId: number;
  userId: number;
}) {
  const tweet = await db.tweet.findUnique({
    where: {
      id: tweetId,
    },
    include: {
      user: true,
      _count: {
        select: { Response: true, likes: true },
      },
      likes: {
        where: { userId: userId },
        select: { userId: true },
      },
    },
  });

  if (!tweet) {
    return null;
  }

  return {
    ...tweet,
    likeCount: tweet._count.likes,
    responseCount: tweet._count.Response,
    isLiked: tweet.likes.length > 0,
  };
}
