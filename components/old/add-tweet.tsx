"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { redirect } from "next/navigation";
import { handleCreateTweet } from "@/app/service/tweet-service";
import { PlusCircleIcon, PaperClipIcon } from "@heroicons/react/24/outline";

export default function AddTweet() {
  const [state, formAction] = useActionState(handleCreateTweet, null);
  const { pending } = useFormStatus();

  if (state?.redirectToLogin) {
    redirect("/log-in");
  }

  return (
    <div className="flex w-[600px] gap-4 bg-slate-700 p-8">
      <div>
        <div className="h-16 w-16 rounded-full bg-white"></div>
      </div>
      <form action={formAction} className="w-full">
        <textarea
          name="tweet"
          placeholder="What's happening?"
          required
          rows={3}
          className="w-full rounded-lg border border-slate-500 bg-slate-700 p-4 outline-none focus:border-blue-400 focus:ring-blue-400"
        />
        {!state?.isSuccess && <span>{state?.error?.fieldErrors?.tweet}</span>}
        <div className="flex items-center justify-between">
          <PaperClipIcon className="h-6 w-6 text-slate-400" />
          <button>
            <PlusCircleIcon className="h-14 w-14 text-blue-400 hover:text-blue-600" />
          </button>
        </div>
      </form>
    </div>
  );
}
