"use client";

import ListResponse from "../tweet-components/list-response";
import DetailTweet from "../tweet-components/detail-tweet";
import { User } from "@prisma/client";
import { InitialResponses } from "@/app/service/response-service";

interface TweetDetailContainerProps {
  tweetId: number;
  tweet: string;
  user: User;
  created_at: Date;
  responses: InitialResponses;
  responseCount: number;
  likeCount: number;
  isLiked: boolean;
}

export default function TweetDetailContainer({
  tweetId,
  tweet,
  user,
  created_at,
  responses,
  responseCount,
  likeCount,
  isLiked,
}: TweetDetailContainerProps) {
  const fetchedResponses = responses.responses;
  return (
    <div className="flex w-full flex-col gap-2 divide-y divide-border rounded-2xl bg-white px-7 py-3 text-xl text-font shadow">
      <DetailTweet
        key={tweetId}
        tweetId={tweetId}
        tweet={tweet}
        created_at={created_at}
        user={user}
        responseCount={responseCount}
        isLiked={isLiked}
        likeCount={likeCount}
      />
      <div className="flex w-full flex-col divide-y pt-5">
        {fetchedResponses.map((response) => (
          <ListResponse key={response.id} response={response} />
        ))}
      </div>
    </div>
  );
}
