"use client";

import { PlusCircleIcon as AddTweetIcon } from "@heroicons/react/24/solid";

export default function AddTweetButton() {
  return (
    <button title="addtweet" className="absolute bottom-0 right-0">
      <AddTweetIcon className="size-16 text-primary hover:text-primary-hover" />
    </button>
  );
}
