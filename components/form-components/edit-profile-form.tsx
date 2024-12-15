"use client";

import FormInput from "@/components/form-components/form-input";
import FormButton from "@/components/form-components/form-button";
import { useActionState } from "react";
import { editProfile } from "@/app/(tab)/users/[username]/edit/action";
import { InitialUserInformationType } from "@/app/service/user-service";
import { UserCircleIcon as ProfileIcon } from "@heroicons/react/24/outline";

interface EditProfileFormProps {
  initialUserInformation: InitialUserInformationType;
}

export default function EditProfileForm({
  initialUserInformation,
}: EditProfileFormProps) {
  const [state, formAction] = useActionState(editProfile, null);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex w-full flex-col gap-2 divide-y divide-border rounded-2xl bg-white p-5 text-2xl shadow">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center justify-center gap-2">
            <ProfileIcon className="size-20 text-secondary-font" />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-extrabold">
                {initialUserInformation?.username}
              </span>
              <span className="text-xl font-semibold text-secondary-font">
                {initialUserInformation?.email}
              </span>
            </div>
          </div>
        </div>
      </div>
      <form action={formAction} className="grid gap-4">
        <FormInput
          type="email"
          name="email"
          placeholder="email"
          required={false}
          errors={state?.error?.fieldErrors.email}
          defaultValue={initialUserInformation?.email}
          hidden={true}
        />
        <FormInput
          type="username"
          name="username"
          placeholder="username"
          required
          errors={state?.error?.fieldErrors.username}
          defaultValue={initialUserInformation?.username}
          hidden={true}
        />
        <FormInput
          type="bio"
          name="bio"
          placeholder="Bio"
          required={false}
          errors={state?.error?.fieldErrors.bio}
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
          name="newPassword"
          placeholder="New Password"
          required={false}
          errors={state?.error?.fieldErrors.newPassword}
        />
        <FormButton text="Edit Profile" />
      </form>
    </div>
  );
}
