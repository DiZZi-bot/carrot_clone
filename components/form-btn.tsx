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
      className="w-full rounded-xl bg-blue-600 p-3 text-lg font-bold text-white/90 transition duration-200 ease-in-out hover:bg-blue-800"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
