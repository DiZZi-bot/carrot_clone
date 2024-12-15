import LikeButton from "./like-button";
import ResponseButton from "./response-button";
import Link from "next/link";

interface DetailTweetProps {
  username: string;
  tweet: string;
  tweetId: number;
  created_at: string;
  isLiked: boolean;
  likeCount: number;
  responseCount: number;
}

export default function DetailTweet({
  username,
  tweet,
  tweetId,
  created_at,
  isLiked,
  likeCount,
  responseCount,
}: DetailTweetProps) {
  return (
    <div className="flex flex-col text-2xl">
      <Link href={`/tweets/${tweetId}`}>
        <div className="flex">
          <div className="h-16 w-16 rounded-full bg-white"></div>
          <div className="flex flex-col pl-4">
            <div className="flex items-end gap-2">
              <span className="text-bold">{username}</span>
              <span className="text-lg text-slate-400">{created_at}</span>
            </div>
            <div className="w-[440px] break-words">{tweet}</div>
          </div>
        </div>
      </Link>
      <div className="flex items-center justify-start gap-5 pl-20 text-sm">
        <ResponseButton responseCount={responseCount} tweetId={tweetId} />
        <LikeButton isLiked={isLiked} likeCount={likeCount} tweetId={tweetId} />
      </div>
    </div>
  );
}
