"use client";

import { ChatBubbleLeftRightIcon as ResponseIcon } from "@heroicons/react/24/outline";

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
    <div className="flex items-center justify-center gap-1">
      <Link href={`tweets/${tweetId}`}>
        <button className="size-4">
          <ResponseIcon />
        </button>
      </Link>
      <span className="text-base text-secondary-hover">{responseCount}</span>
    </div>
  );
}
