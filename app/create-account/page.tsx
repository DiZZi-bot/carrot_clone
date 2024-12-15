"use client";

import FormButton from "@/components/form-components/form-button";
import FormInput from "@/components/form-components/form-input";
import FormTitle from "@/components/form-components/form-title";
import FormSuccess from "@/components/form-components/form-success";
import Formlink from "@/components/form-components/form-link";
import { useActionState } from "react";
import { handleCreateAccountForm } from "./action";

export default function Home() {
  const [state, formAction] = useActionState(handleCreateAccountForm, null);

  return (
    <div className="mt-36 flex h-screen w-full bg-background">
      <div className="w-[600px] space-y-4 rounded-2xl">
        <form action={formAction} className="grid gap-4">
          <FormTitle text="Create Account" />
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
          <FormInput
            type="password"
            name="confirm_password"
            placeholder="Confirm Password"
            required
            errors={state?.error?.fieldErrors.confirm_password}
          />
          <FormButton text="Create Account" />
        </form>
        {state?.isSuccess && <FormSuccess text="Create Success!" />}
        <Formlink
          href="/log-in"
          basicText="Already have an account?"
          linkText="Log In"
        />
      </div>
    </div>
  );
}
