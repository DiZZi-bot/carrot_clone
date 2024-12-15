"use client";

import { ChatBubbleBottomCenterTextIcon as ResponseIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface ResponseButtonProps {
  responseCount: number;
  tweetId: number;
}

export default function ResponseButton({
  responseCount,
  tweetId,
}: ResponseButtonProps) {
  return (
    <Link href={`/tweets/${tweetId}`}>
      <div className="flex items-center justify-center gap-1 text-sm">
        <ResponseIcon className="size-5" />
        <span>{responseCount}</span>
      </div>
    </Link>
  );
}
