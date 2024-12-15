"use client";

import { useActionState } from "react";
import { searchTweet } from "./action";
import FormInput from "@/components/form-components/form-input";
import TweetContainer from "@/components/tweet-components/tweet-container";

export default function Search() {
  const [state, formAction] = useActionState(searchTweet, null);

  return (
    <div className="flex w-full flex-col gap-4">
      <form action={formAction} className="flex w-full items-center gap-2">
        <FormInput
          type="search"
          name="keyword"
          placeholder="Enter your keyword."
          required
          errors={state?.error?.formErrors}
        ></FormInput>
        <button className="flex rounded-lg bg-primary p-3 font-bold text-white">
          Search
        </button>
      </form>
      {state?.data?.length === 0 ? (
        <div className="flex w-full justify-center">
          <span className="rounded-2xl bg-error/70 p-4 font-bold text-white">
            No Result
          </span>
        </div>
      ) : (
        state?.data?.map((tweet) => (
          <TweetContainer
            key={tweet.id}
            {...tweet}
            likeCount={tweet._count.likes}
            responseCount={tweet._count.Response}
            isLiked={tweet.likes.length > 0}
          />
        ))
      )}
    </div>
  );
}
