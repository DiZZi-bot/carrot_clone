import { formatToTimeAgo } from "@/lib/utils";
import Link from "next/link";
import { User } from "@prisma/client";
import DetailTweet from "./detail-tweet";

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
      <DetailTweet
        username={user?.username}
        tweet={tweet}
        created_at={formatToTimeAgo(created_at.toString())}
      />
    </Link>
  );
}
