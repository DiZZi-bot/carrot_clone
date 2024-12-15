"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { keywordSchema } from "@/lib/zodSchema";

export async function searchTweet(_: unknown, formData: FormData) {
  const keyword = formData.get("keyword");
  const result = keywordSchema.safeParse(keyword);
  const userId = (await getSession()).id;
  if (!result.success) {
    return { data: null, error: result.error.flatten(), keyword };
  } else {
    const tweets = await db.tweet.findMany({
      where: {
        tweet: {
          contains: result.data,
        },
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
      orderBy: {
        created_at: "desc",
      },
    });

    return { data: tweets, error: null, keyword };
  }
}
