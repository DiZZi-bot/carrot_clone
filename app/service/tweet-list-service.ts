"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { TWEET_NUMBER_FOR_PAGENATION } from "@/lib/constants";

export async function getInitialTweets({ userId }: { userId: number }) {
  const tweets = await db.tweet.findMany({
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
    take: TWEET_NUMBER_FOR_PAGENATION,
    orderBy: {
      created_at: "desc",
    },
  });
  console.log("Do getInitialTweets");
  return tweets.map((tweet) => ({
    ...tweet,
    likeCount: tweet._count.likes,
    responseCount: tweet._count.Response,
    isLiked: tweet.likes.length > 0,
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
        where: { userId: userId },
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
    isLiked: tweet.likes.length > 0,
  }));
}

export async function GetTweetTotalCount() {
  return db.tweet.count();
}
