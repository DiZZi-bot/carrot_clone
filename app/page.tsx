"use client";

import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import { LockIcon } from "@/components/hero-icons";
import { useActionState } from "react";
import { validatePassword } from "../lib/actions";

export default function Home() {
  const [state, formAction] = useActionState(validatePassword, null);

  return (
    <div className="w-full h-screen bg-gray-900 items-center flex justify-center">
      <form
        action={formAction}
        className="bg-slate-700 rounded-2xl p-10 grid gap-4 w-[600px]"
      >
        <div className="mb-6 flex items-center justify-center">
          <LockIcon className="mr-4 size-8 text-blue-400 font-bold" />
          <p className="text-white/90 font-extrabold text-3xl">
            Password Validation
          </p>
        </div>
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required
          errors={[]}
        />
        <FormInput
          type="username"
          name="username"
          placeholder="Username"
          required
          errors={[]}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required
          errors={state?.errors ?? []}
        />
        <FormButton text="Log in" />
      </form>
    </div>
  );
}
