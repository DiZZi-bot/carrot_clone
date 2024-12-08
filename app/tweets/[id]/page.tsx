import { notFound } from "next/navigation";
import MenuBar from "@/components/menu-bar";
import DetailTweet from "@/components/detail-tweet";
import Responses from "@/components/responses";
import { formatToTimeAgo } from "@/lib/utils";
import { unstable_cache as nextCache } from "next/cache";
import { getTweetDetail } from "@/app/service/tweet-service";
import { getLikeStatus } from "@/app/service/like-service";
import { getInitialResponse } from "@/app/service/response-service";
import getSession from "@/lib/session";

async function getCachedLikeStatus(tweetId: number) {
  const userId = (await getSession()).id;
  console.log(`Cached userId: ${userId}`);
  const cachedLikeStatus = nextCache(getLikeStatus, ["tweet-like-status"], {
    tags: [`like-status-${tweetId}`],
  });
  return cachedLikeStatus(tweetId, userId!);
}

async function getCachedResponses(tweetId: number) {
  const cachedResponses = nextCache(getInitialResponse, ["tweet-responses"], {
    tags: [`tweet-responses-${tweetId}`],
  });
  return cachedResponses(tweetId);
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
  const tweet = await getTweetDetail(id);
  const { responses, responseCount } = await getCachedResponses(id);
  if (!tweet) {
    return notFound();
  }
  const { isLiked, likeCount } = await getCachedLikeStatus(id);
  console.log(tweet);
  console.log(responses);
  console.log(`isLiked: ${isLiked}`);
  console.log(`likeCount: ${likeCount}`);
  const resultResponse = {
    responses: responses,
    responseCount: responseCount,
  };

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
              tweetId={tweet.id}
              created_at={formatToTimeAgo(tweet.created_at.toString())}
              isLiked={isLiked}
              likeCount={likeCount}
              responseCount={responseCount}
            />
            <Responses
              initialResponses={resultResponse}
              tweetId={id}
              username={tweet.user.username}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
