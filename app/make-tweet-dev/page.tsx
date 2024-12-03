"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { useActionState } from "react";
import { handleCreateTweet } from "./action";
import { redirect } from "next/navigation";
import Link from "next/link";

export default function MakeTweet() {
  const [state, formAction] = useActionState(handleCreateTweet, null);

  if (state?.redirectToLogin) {
    redirect("/log-in");
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="w-[600px] space-y-4 rounded-2xl bg-slate-700 p-10">
        <form action={formAction} className="grid gap-4">
          <div className="mb-6 flex items-center justify-center">
            <p className="text-3xl font-extrabold text-white/90">
              Create Tweet
            </p>
          </div>
          <FormInput
            type="text"
            name="tweet"
            placeholder="What's happening?"
            required
            errors={state?.error?.fieldErrors?.tweet}
          />
          <FormButton text="Tweet" />
        </form>
        {state?.isSuccess && (
          <div className="flex items-center justify-center rounded-2xl bg-green-500/20 p-4 text-center font-medium text-green-500">
            <span>Tweet created successfully!</span>
          </div>
        )}
        <Link href="/">
          <div className="mt-4 text-right text-blue-400 underline hover:text-blue-600">
            go home
          </div>
        </Link>
      </div>
    </div>
  );
}
