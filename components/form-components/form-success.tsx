"use client";

import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function FormSuccess({ text }: { text: string }) {
  return (
    <div className="bg-success/60 text-success flex items-center justify-center rounded-2xl p-4 text-center font-medium">
      <CheckCircleIcon className="text-success mr-1.5 size-6" />
      <span>L{text}</span>
    </div>
  );
}
