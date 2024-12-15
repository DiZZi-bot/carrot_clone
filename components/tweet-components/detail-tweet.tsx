"use client";

import { formatToTimeAgo } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";
import LikeButton from "./like-button";
import { UserCircleIcon as ProfileIcon } from "@heroicons/react/24/outline";

interface DetailTweetProps {
  tweetId: number;
  tweet: string;
  created_at: Date;
  user: User;
  responseCount: number;
  likeCount: number;
  isLiked: boolean;
}

export default function DetailTweet({
  tweet,
  tweetId,
  created_at,
  user,
  responseCount,
  isLiked,
  likeCount,
}: DetailTweetProps) {
  return (
    <div className="flex w-full flex-col gap-2 pb-5 text-xl text-font">
      <div className="flex gap-4">
        <Link href={`/users/${user.username}`}>
          <ProfileIcon className="size-16 text-secondary-font" />
        </Link>
        <div className="flex flex-col">
          <div className="font-bold">{user.username}</div>
          <div className="text-lg text-secondary-font">
            {formatToTimeAgo(created_at.toString())}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col px-3 pt-1">
        <div className="break-all">{tweet}</div>
        <div className="mt-3 flex gap-3">
          <div className="flex gap-1 text-base">
            <span className="font-bold">{responseCount}</span>
            <span className="text-secondary-font">Responses</span>
          </div>
          <div className="flex gap-1">
            <div className="font-bold">
              <LikeButton
                isLiked={isLiked}
                likeCount={likeCount}
                tweetId={tweetId}
              />
            </div>
            <span className="text-base text-secondary-font">Likes</span>
          </div>
        </div>
      </div>
    </div>
  );
}
