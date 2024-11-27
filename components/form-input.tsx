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
          <EmailIcon className="absolute left-3 text-gray-400 size-6" />
        )}
        {type === "password" && (
          <KeyIcon className="absolute left-3 text-gray-400 size-6" />
        )}
        {type === "username" && (
          <UserIcon className="absolute left-3 text-gray-400 size-6" />
        )}
        <input
          className="form-input w-full"
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>

      {errors.map((error, index) => (
        <div className="flex justify-center items-center p-2 rounded-lg text-center font-medium text-red-500 bg-red-500/20">
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
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <span>{error}</span>
        </div>
      ))}
    </div>
  );
}
