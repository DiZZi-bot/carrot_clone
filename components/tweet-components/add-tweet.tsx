"use client";

import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { handleCreateTweet } from "@/app/service/tweet-service";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { UserCircleIcon as ProfileIcon } from "@heroicons/react/24/outline";
import { TWEET_MAX_LENGTH } from "@/lib/constants";

export default function AddTweetForm() {
  const [state, formAction] = useActionState(handleCreateTweet, null);
  const { pending } = useFormStatus();
  const [tweetText, setTweetText] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  if (state?.redirectToLogin) {
    redirect("/log-in");
  }
  return (
    <div className="flex w-full flex-col gap-2 rounded-2xl bg-white px-7 py-3.5 pb-5 text-xl text-font">
      <ProfileIcon className="size-20 text-secondary-font" />
      <form action={formAction} className="w-full">
        <textarea
          name="tweet"
          placeholder="What's happening?"
          onChange={handleTextChange}
          value={tweetText}
          required
          rows={3}
          maxLength={TWEET_MAX_LENGTH}
          className="w-full rounded-lg border border-border p-4 outline-none focus:border-blue-400 focus:ring-blue-400"
        />
        {!state?.isSuccess && <span>{state?.error?.fieldErrors?.tweet}</span>}

        <div className="flex items-start justify-between">
          <div className="flex text-base text-secondary-font">
            {tweetText.length}/{TWEET_MAX_LENGTH}
          </div>
          <button>
            <PlusCircleIcon className="h-14 w-14 text-blue-400 hover:text-blue-600" />
          </button>
        </div>
      </form>
    </div>
  );
}
