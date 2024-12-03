import { notFound } from "next/navigation";
import db from "@/lib/db";

async function getTweet(id: number) {
  const tweet = await db.tweet.findUnique({
    where: { id },
    include: { user: { select: { username: true } } },
  });
  return tweet;
}

export default async function TweetDetail({
  params,
}: {
  params: { id: string };
}) {
  const tweetParams = await params;
  const id = Number(tweetParams.id);

  if (isNaN(id)) {
    return notFound();
  }
  const tweet = await getTweet(id);
  console.log(tweet);
  if (!tweet) {
    return notFound();
  }

  return (
    <div>
      <div>{tweet.user.username}</div>
      <div>{tweet.tweet}</div>
    </div>
  );
}
