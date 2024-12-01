import { EmailIcon, KeyIcon, UserIcon } from "./hero-icons";

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
          <EmailIcon className="absolute left-3 size-6 text-gray-400" />
        )}
        {type === "password" && (
          <KeyIcon className="absolute left-3 size-6 text-gray-400" />
        )}
        {type === "username" && (
          <UserIcon className="absolute left-3 size-6 text-gray-400" />
        )}
        <input
          className="w-full rounded-xl border-none bg-white/10 p-3 pl-12 text-white/90 placeholder:text-gray-400 focus:border-none focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-400"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>

      {errors.map((error, index) => (
        <div className="flex items-center justify-center rounded-lg bg-red-500/20 p-2 text-center font-medium text-red-500">
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
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
}
