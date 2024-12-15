"use client";

import FormButton from "@/components/form-components/form-button";
import FormInput from "@/components/form-components/form-input";
import FormTitle from "@/components/form-components/form-title";
import FormSuccess from "@/components/form-components/form-success";
import Formlink from "@/components/form-components/form-link";
import { useActionState } from "react";
import { handleLogInForm } from "./actions";

export default function Home() {
  const [state, formAction] = useActionState(handleLogInForm, null);

  return (
    <div className="mt-36 flex h-screen w-full bg-background">
      <div className="w-[600px] space-y-4 rounded-2xl">
        <form action={formAction} className="grid gap-4">
          <FormTitle text="Log In" />
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            required
            errors={state?.error?.fieldErrors.email}
          />
          <FormInput
            type="password"
            name="password"
            placeholder="Password"
            required
            errors={state?.error?.fieldErrors.password}
          />
          <FormButton text="Log In" />
        </form>
        {state?.isSuccess && <FormSuccess text="Log In Success!" />}
        <Formlink
          href="/create-account"
          basicText="ew to Nomad_X?"
          linkText="Create an account"
        />
      </div>
    </div>
  );
}
