"use client";

import { useActionState } from "react";
import { UserCircleIcon as ProfileIcon } from "@heroicons/react/24/outline";
import { handleCreateResponse } from "@/app/service/response-service";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import { RESPONSE_MAX_LENGTH } from "@/lib/constants";
import { redirect } from "next/navigation";

export default function AddResponse({ tweetId }: { tweetId: number }) {
  const [state, formAction] = useActionState(handleCreateResponse, null);

  if (state?.redirectToLogin) {
    redirect("/log-in");
  }

  return (
    <div className="absolute bottom-4 flex w-full items-center gap-2 rounded-2xl bg-white p-3 text-xl text-font shadow">
      <ProfileIcon className="size-12" />
      <form action={formAction} className="flex w-full">
        <div className="flex w-full items-center">
          <textarea
            name="response"
            placeholder="Write your response."
            required
            rows={1}
            maxLength={RESPONSE_MAX_LENGTH}
            className="w-full text-base"
          ></textarea>
          <input
            className="hidden"
            type="hidden"
            name="tweetId"
            value={tweetId}
          />
        </div>
        <button>
          <PlusCircleIcon className="size-12 text-primary hover:text-primary-hover" />
        </button>
      </form>
    </div>
  );
}
