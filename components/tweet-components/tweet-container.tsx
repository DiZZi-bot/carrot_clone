"use client";

import { formatToTimeAgo } from "@/lib/utils";
import { User } from "@prisma/client";
import Link from "next/link";
import ResponseButton from "./response-button";
import { UserCircleIcon as ProfileIcon } from "@heroicons/react/24/outline";
import LikeButtonForList from "./like-button-for-list";

interface TweetCountainerProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: User;
  isLiked: boolean;
  likeCount: number;
  responseCount: number;
}

export default function TweetContainer({
  id,
  tweet,
  created_at,
  user,
  isLiked,
  likeCount,
  responseCount,
}: TweetCountainerProps) {
  return (
    <div className="flex w-full gap-2 rounded-2xl bg-white px-7 py-3.5 text-lg text-font shadow">
      <Link href={`/users/${user.username}`}>
        <ProfileIcon className="size-16 text-secondary-font" />
      </Link>
      <div className="flex w-full flex-col px-3">
        <Link href={`/tweets/${id}`}>
          <div className="flex items-end gap-2">
            <div className="font-bold">{user.username}</div>
            <div className="text-base text-secondary-font">
              {formatToTimeAgo(created_at.toString())}
            </div>
          </div>
          <div className="break-all text-sm">{tweet}</div>
        </Link>
        <div className="mt-3 flex gap-3">
          <ResponseButton tweetId={id} responseCount={responseCount} />
          <LikeButtonForList
            isLiked={isLiked}
            likeCount={likeCount}
            tweetId={id}
          />
        </div>
      </div>
    </div>
  );
}
