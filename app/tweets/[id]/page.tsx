import { notFound } from "next/navigation";
import db from "@/lib/db";
import MenuBar from "@/components/menu-bar";
import { formatToTimeAgo } from "@/lib/utils";
import DetailTweet from "@/components/detail-tweet";

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
    <div className="flex h-screen w-full items-start justify-center gap-3 bg-gray-900 text-white">
      <MenuBar />
      <div className="flex h-full w-[600px] flex-col gap-2">
        <div className="bg-slate-700 px-8 py-5 text-2xl font-bold">
          Tweet Detail
        </div>
        <div className="relative h-full w-full bg-slate-700">
          <div className="flex flex-col gap-12 p-8">
            <DetailTweet
              username={tweet.user?.username}
              tweet={tweet.tweet}
              created_at={formatToTimeAgo(tweet.created_at.toString())}
            />
            <div className="text-center">(dev)Reply Area</div>
          </div>
        </div>
      </div>
    </div>
  );
}
