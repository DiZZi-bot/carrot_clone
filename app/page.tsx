"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { LockIcon } from "@/components/hero-icons";
import { useActionState } from "react";
import { validateAccount } from "../lib/actions";

export default function Home() {
  const [state, formAction] = useActionState(validateAccount, null);

  return (
    <div className="w-full h-screen bg-gray-900 items-center flex justify-center">
      <div className="bg-slate-700 rounded-2xl w-[600px] p-10 space-y-4">
        <form action={formAction} className="grid gap-4">
          <div className="mb-6 flex items-center justify-center">
            <LockIcon className="mr-4 size-8 text-blue-400 font-bold" />
            <p className="text-white/90 font-extrabold text-3xl">
              Account Validation
            </p>
          </div>
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            required
            errors={state?.fieldErrors.email}
          />
          <FormInput
            type="username"
            name="username"
            placeholder="Username"
            required
            errors={state?.fieldErrors.username}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            required
            errors={state?.fieldErrors.password}
          />
          <FormButton text="Log in" />
        </form>
        {state === undefined && (
          <div className="flex justify-center items-center p-4 rounded-2xl text-center font-medium text-green-500 bg-green-500/20">
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="size-6 mr-1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Welcome back!</span>
          </div>
        )}
      </div>
    </div>
  );
}
