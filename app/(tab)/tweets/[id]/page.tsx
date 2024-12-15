import { notFound } from "next/navigation";
import { unstable_cache as nextCache } from "next/cache";
import { getLikeStatus } from "@/app/service/like-service";
import { getInitialResponse } from "@/app/service/response-service";
import getSession from "@/lib/session";
import TweetDetailContainer from "@/components/window-components/tweet-detail-container";
import AddResponse from "@/components/response-components/add-response";
import { getTweetById } from "@/app/service/tweet-service";

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
  const tweetId = Number(tweetParams.id);
  const userId = Number((await getSession()).id);

  if (isNaN(tweetId)) {
    return notFound();
  }
  const tweet = await getTweetById({ tweetId, userId });
  const { responses, responseCount } = await getCachedResponses(tweetId);
  if (!tweet) {
    return notFound();
  }
  const resultResponse = {
    responses: responses,
    responseCount: responseCount,
  };

  return (
    <div className="relative flex w-full flex-col gap-3 text-white">
      <TweetDetailContainer
        key={tweetId}
        tweetId={tweetId}
        {...tweet}
        responses={resultResponse}
      />
      <AddResponse tweetId={tweetId} />
    </div>
  );
}
