import { formatToTimeAgo } from "@/lib/utils";
import { User } from "@prisma/client";
import LikeButton from "./like-button";
import ResponseButton from "./response-button";
import Link from "next/link";

interface ListTweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: User;
  isLiked: boolean;
  likeCount: number;
  responseCount: number;
}

export default function ListTweet({
  id,
  tweet,
  created_at,
  user,
  isLiked,
  likeCount,
  responseCount,
}: ListTweetProps) {
  return (
    <div className="flex flex-col text-2xl">
      <Link href={`/tweets/${id}`}>
        <div className="flex">
          <div className="h-16 w-16 rounded-full bg-white"></div>
          <div className="flex flex-col pl-4">
            <div className="flex items-end gap-2">
              <span className="text-bold">{user.username}</span>
              <span className="text-lg text-slate-400">
                {formatToTimeAgo(created_at.toString())}
              </span>
            </div>
            <div className="w-[440px] break-words">{tweet}</div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-start gap-5 pl-20 text-sm">
        <ResponseButton responseCount={responseCount} tweetId={id} />
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={id} />
      </div>
    </div>
  );
}
