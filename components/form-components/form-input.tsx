"use client";

import { EnvelopeIcon as EmailIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { XCircleIcon } from "@heroicons/react/24/outline";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
}

export default function FormInput({
  type,
  name,
  placeholder,
  required,
  errors = [],
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center">
        {type === "email" && (
          <EmailIcon className="text-font absolute left-3 size-6" />
        )}
        {type === "password" && (
          <KeyIcon className="text-font absolute left-3 size-6" />
        )}
        {type === "username" && (
          <UserIcon className="text-font absolute left-3 size-6" />
        )}
        <input
          className="text-font placeholder:text-secondary-font focus:ring-input-focus-border w-full rounded-xl border-none bg-white p-3 pl-12 focus:border-none focus:border-transparent focus:outline-none focus:ring-2"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>

      {errors.map((error, index) => (
        <div
          key={index}
          className="bg-error/30 text-error flex items-center justify-center rounded-lg p-2 text-center font-medium"
        >
          <XCircleIcon className="text-error mr-1.5 size-6" />
          <span className="font-bold">{error}</span>
        </div>
      ))}
    </div>
  );
}
