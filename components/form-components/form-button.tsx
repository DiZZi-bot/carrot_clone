"use client";

import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`${pending ? "bg-secondary-hover" : "bg-primary hover:bg-primary-hover"} w-full rounded-xl p-3 text-lg font-bold text-white transition duration-200 ease-in-out`}
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
