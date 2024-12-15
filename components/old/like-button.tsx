"use client";

import { useOptimistic, startTransition } from "react";
import { HeartIcon as UnlikedIcon } from "@heroicons/react/24/outline";
import { HeartIcon as LikedIcon } from "@heroicons/react/24/solid";
import { unlikeTweet, likeTweet } from "@/app/service/like-service";

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
  const [state, reducerFn] = useOptimistic(
    { isLiked, likeCount },
    (previousState) => ({
      isLiked: !previousState.isLiked,
      likeCount: previousState.isLiked
        ? previousState.likeCount - 1
        : previousState.likeCount + 1,
    }),
  );
  const onClick = () => {
    startTransition(() => {
      reducerFn({});
    });
    if (state.isLiked) {
      unlikeTweet(tweetId);
    } else likeTweet(tweetId);
  };
  return (
    <form action={onClick}>
      <button className="flex items-center justify-center gap-1 text-sm">
        {state.isLiked ? (
          <LikedIcon className="size-5" />
        ) : (
          <UnlikedIcon className="size-5" />
        )}
        <span>{state.likeCount}</span>
      </button>
    </form>
  );
}
