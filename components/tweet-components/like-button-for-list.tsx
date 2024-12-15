"use client";

import {
  likeTweetForList,
  unlikeTweetForList,
} from "@/app/service/like-service";
import { HeartIcon as UnLikedIcon } from "@heroicons/react/24/outline";
import { HeartIcon as IsLikedIcon } from "@heroicons/react/24/solid";
import { useOptimistic } from "react";

interface LikeButtonProps {
  isLiked: boolean;
  likeCount: number;
  tweetId: number;
}

export default function LikeButtonForList({
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
  const handleLikeButton = async () => {
    const action = isLiked ? unlikeTweetForList : likeTweetForList;
    reducer(null);
    try {
      action(tweetId);
    } catch {
      console.log("HandleLikeButton ERROR");
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
