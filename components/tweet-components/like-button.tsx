"use client";

import { likeTweet, unlikeTweet } from "@/app/service/like-service";
import { HeartIcon as UnLikedIcon } from "@heroicons/react/24/outline";
import { HeartIcon as IsLikedIcon } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButton({
  isLiked,
  likeCount,
  tweetId,
}: LikeButtonProps) {
  const [state, reducer] = useOptimistic(
    { likeCount, isLiked },
    (previousState) => ({
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
      isLiked: !previousState.isLiked,
    }),
  );
  const handleLikeButton = () => {
    reducer(null);
    if (state.isLiked) {
      unlikeTweet(tweetId);
    } else {
      likeTweet(tweetId);
    }
  };
  return (
    <form
      action={handleLikeButton}
      className="flex items-center justify-center gap-1"
    >
      <button className="size-4 text-error">
        {state.isLiked ? <IsLikedIcon /> : <UnLikedIcon />}
      </button>
      <span className="text-base text-secondary-hover">{state.likeCount}</span>
    </form>
  );
}
