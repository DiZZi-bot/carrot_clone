"use client";

import TweetContainer from "../tweet-components/tweet-container";
import { useState } from "react";
import { TWEET_NUMBER_FOR_PAGENATION } from "@/lib/constants";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { InitialTweets, GetMoreTweets } from "@/app/service/tweet-list-service";

interface TweetListProps {
  initialTweets: InitialTweets;
  userId: number;
  totalTweetCount: number;
}

export default function TweetList({
  initialTweets,
  userId,
  totalTweetCount,
}: TweetListProps) {
  const [tweets, setTweets] = useState(initialTweets);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);

  const totalPages = Math.ceil(totalTweetCount / TWEET_NUMBER_FOR_PAGENATION);

  const loadTweets = async (newPage: number, userId: number) => {
    setIsLoading(true);
    try {
      const fetchedTweets = await GetMoreTweets(newPage, userId);
      console.log(`fetchedTweets: ${fetchedTweets}`);
      setTweets([...fetchedTweets]);

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
    loadTweets(newPage, userId);
  };

  return (
    <div className="relative flex h-full w-full flex-col">
      <div className="flex flex-col gap-3">
        {tweets.map((tweet) => (
          <TweetContainer key={tweet.id} {...tweet} />
        ))}
      </div>
      {totalTweetCount > TWEET_NUMBER_FOR_PAGENATION && (
        <div className="absolute bottom-2 flex w-full items-center justify-center gap-2">
          <button
            className="disabled:text-background"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1 || isLoading}
          >
            <ChevronLeftIcon className="size-8" />
          </button>
          <div
            className={`flex w-1/4 items-center justify-center ${isLoading && "text-secondary-font"}`}
          >
            {isLoading ? "Loading..." : `${page}`}
          </div>
          <button
            className="disabled:text-background"
            onClick={() => handlePageChange(page + 1)}
            disabled={isLastPage || isLoading}
          >
            <ChevronRightIcon className="size-8" />
          </button>
        </div>
      )}
    </div>
  );
}
