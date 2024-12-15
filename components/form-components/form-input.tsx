"use client";

import { EnvelopeIcon as EmailIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/outline";
import { InformationCircleIcon as BioIcon } from "@heroicons/react/24/outline";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  defaultValue?: string;
  hidden?: boolean;
}

export default function FormInput({
  type,
  name,
  placeholder,
  required,
  errors = [],
  defaultValue,
  hidden,
}: FormInputProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <div className="relative flex items-center">
        {type === "email" && !hidden && (
          <EmailIcon className="absolute left-3 size-6 text-font" />
        )}
        {type === "password" && !hidden && (
          <KeyIcon className="absolute left-3 size-6 text-font" />
        )}
        {type === "username" && !hidden && (
          <UserIcon className="absolute left-3 size-6 text-font" />
        )}
        {type === "search" && !hidden && (
          <SearchIcon className="absolute left-3 size-6 text-font" />
        )}
        {type === "bio" && !hidden && (
          <BioIcon className="absolute left-3 size-6 text-font" />
        )}
        <input
          className="w-full rounded-xl border-none bg-white p-3 pl-12 text-font placeholder:text-secondary-font focus:border-none focus:border-transparent focus:outline-none focus:ring-2 focus:ring-input-focus-border"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
          defaultValue={defaultValue}
          hidden={hidden}
        />
      </div>

      {errors.map((error, index) => (
        <div
          key={index}
          className="flex items-center justify-center rounded-lg bg-error/30 p-2 text-center font-medium text-error"
        >
          <XCircleIcon className="mr-1.5 size-6 text-error" />
          <span className="font-bold">{error}</span>
        </div>
      ))}
    </div>
  );
}
