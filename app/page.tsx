"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { LockIcon } from "@/components/hero-icons";
import { useActionState } from "react";
import { validateAccount } from "./actions";

export default function Home() {
  const [state, formAction] = useActionState(validateAccount, null);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="w-[600px] space-y-4 rounded-2xl bg-slate-700 p-10">
        <form action={formAction} className="grid gap-4">
          <div className="mb-6 flex items-center justify-center">
            <LockIcon className="mr-4 size-8 font-bold text-blue-400" />
            <p className="text-3xl font-extrabold text-white/90">
              Account Validation
            </p>
          </div>
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            required
            errors={state?.error?.fieldErrors.email}
          />
          <FormInput
            type="username"
            name="username"
            placeholder="Username"
            required
            errors={state?.error?.fieldErrors.username}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            required
            errors={state?.error?.fieldErrors.password}
          />
          <FormButton text="Log in" />
        </form>
        {state?.isSuccess && (
          <div className="flex items-center justify-center rounded-2xl bg-green-500/20 p-4 text-center font-medium text-green-500">
            <svg
              data-slot="icon"
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="mr-1.5 size-6"
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
