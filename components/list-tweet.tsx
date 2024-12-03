import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { User } from "@prisma/client";

interface ListTweetProps {
  id: number;
  tweet: string;
  created_at: Date;
  user: User;
}

export default function ListTweet({
  id,
  tweet,
  created_at,
  user,
}: ListTweetProps) {
  return (
    <Link href={`/tweets/${id}`}>
      <div className="flex flex-col gap-2 text-white">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-300"></div>
            <span className="text-xl font-bold">{user.username}</span>
          </div>
          <span className="text-right text-neutral-400">
            {formatToTimeAgo(created_at.toString())}
          </span>
        </div>
        <span className="text-3xl">{tweet}</span>
      </div>
    </Link>
  );
}
