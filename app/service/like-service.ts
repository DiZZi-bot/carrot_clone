"use server";

import { revalidateTag } from "next/cache";
import db from "@/lib/db";
import getSession from "@/lib/session";

export async function getLikeStatus(userId: number, tweetId: number) {
  const like = await db.like.findUnique({
    where: { id: { userId, tweetId } },
  });
  const likeCount = await db.like.count({
    where: { tweetId },
  });

  console.log(`likeCount: ${likeCount}`);

  return {
    isLiked: Boolean(like),
    likeCount,
  };
}

export async function likeTweet(tweetId: number) {
  console.log("like?");
  const session = await getSession();
  await db.like.create({
    data: {
      tweetId,
      userId: session.id!,
    },
  });
  console.log("like!");
  revalidateTag(`like-status-${tweetId}`);
}

export async function unlikeTweet(tweetId: number) {
  try {
    const session = await getSession();
    await db.like.delete({
      where: {
        id: {
          tweetId,
          userId: session.id!,
        },
      },
    });
    console.log("unlike!");
    revalidateTag(`like-status-${tweetId}`);
  } catch (e) {}
}
