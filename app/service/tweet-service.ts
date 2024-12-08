"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { TWEET_NUMBER_FOR_PAGENATION } from "@/lib/constants";
import { z, typeToFlattenedError } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { createTweetSchema } from "@/lib/zodSchema";

export async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    include: {
      user: true,
      _count: {
        select: { Response: true, likes: true },
      },
    },
    take: TWEET_NUMBER_FOR_PAGENATION,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets.map((tweet) => ({
    ...tweet,
    likeCount: tweet._count.likes,
    responseCount: tweet._count.Response,
    isLiked: false,
  }));
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export async function GetMoreTweets(page: number, userId: number) {
  const tweets = await db.tweet.findMany({
    include: {
      user: true,
      _count: {
        select: { Response: true, likes: true },
      },
      likes: {
        where: { userId },
        select: { userId: true },
      },
    },
    skip: TWEET_NUMBER_FOR_PAGENATION * (page - 1),
    take: TWEET_NUMBER_FOR_PAGENATION,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets.map((tweet) => ({
    ...tweet,
    likeCount: tweet._count.likes,
    responseCount: tweet._count.Response,
    isLiked: false,
  }));
}

export async function GetTweetTotalCount() {
  return db.tweet.count();
}

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
  } catch (error) {
    console.error("Error creating tweet:", error);
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
