"use client";

import ListTweet from "./list-tweet";
import { useState } from "react";
import { TWEET_NUMBER_FOR_PAGENATION } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import {
  InitialTweets,
  GetMoreTweets,
  GetTweetTotalCount,
} from "@/app/service/tweet-service";
import {} from "@/app/service/tweet-service";

export default function TweetList({
  initialTweets,
}: {
  initialTweets: InitialTweets;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const loadTweets = async (newPage: number) => {
    setIsLoading(true);
    try {
      const fetchedTweets = await GetMoreTweets(newPage);
      console.log(`fetchedTweets: ${fetchedTweets}`);
      setTweets(fetchedTweets);
      const totalTweetCount = await GetTweetTotalCount();
      console.log(`totalTweetCount: ${totalTweetCount}`);
      const totalPages = Math.ceil(
        totalTweetCount / TWEET_NUMBER_FOR_PAGENATION,
      );
      console.log(`totalPages: ${totalPages}`);
      setIsLastPage(newPage >= totalPages);
    } catch (error) {
      console.error("Failed to load tweets", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || isLoading || newPage === page) return;
    setPage(newPage);
    loadTweets(newPage);
  };

  return (
    <div className="relative h-full">
      <div className="flex flex-col gap-12 p-10">
        {tweets.map((tweet) => (
          <ListTweet key={tweet.id} {...tweet} />
        ))}
      </div>
      <div className="absolute bottom-5 w-[600px]">
        <div className="flex w-full items-center justify-center">
          <button
            className="disabled:text-stone-500"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeftIcon width={20} height={20} />
          </button>
          <div>
            {!isLoading && <div className="w-[100px] text-center">{page}</div>}
            {isLoading && (
              <div className="w-[100px] text-center">Loading...</div>
            )}
          </div>
          <button
            className="disabled:text-stone-500"
            onClick={() => handlePageChange(page + 1)}
            disabled={isLastPage || isLoading}
          >
            <ChevronRightIcon width={20} height={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
