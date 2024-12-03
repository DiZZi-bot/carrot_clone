"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { TWEET_NUMBER_FOR_PAGENATION } from "@/lib/constants";

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
