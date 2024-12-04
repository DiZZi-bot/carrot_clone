"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { TWEET_NUMBER_FOR_PAGENATION, TWEET_MAX_LENGTH } from "@/lib/constants";
import { z, typeToFlattenedError } from "zod";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

export async function getInitialTweets() {
  const tweets = await db.tweet.findMany({
    include: { user: true },
    take: TWEET_NUMBER_FOR_PAGENATION,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}
export type InitialTweets = Prisma.PromiseReturnType<typeof getInitialTweets>;

export async function GetMoreTweets(page: number) {
  const tweets = await db.tweet.findMany({
    include: { user: true },
    skip: TWEET_NUMBER_FOR_PAGENATION * (page - 1),
    take: TWEET_NUMBER_FOR_PAGENATION,
    orderBy: {
      created_at: "desc",
    },
  });
  return tweets;
}

export async function GetTweetTotalCount() {
  return db.tweet.count();
}

const createTweetSchema = z.object({
  tweet: z
    .string({
      required_error: "Tweet cannot be empty.",
    })
    .trim()
    .max(
      TWEET_MAX_LENGTH,
      `Tweet cannot exceed ${TWEET_MAX_LENGTH} characters.`,
    ),
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
