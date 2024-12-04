"use client";

import Link from "next/link";

export default function MunuBar() {
  return (
    <div className="h-screen w-[300px] bg-slate-700 px-10 pt-5">
      <div className="mb-16 text-3xl font-bold text-blue-400">Nomad X</div>
      <div className="flex flex-col gap-8 font-semibold">
        <Link href="/" className="flex w-full items-center justify-start gap-4">
          <div>Icon</div>
          <div className="text-2xl text-slate-200 hover:text-blue-400">
            Home
          </div>
        </Link>
        <Link
          href="/profile"
          className="flex w-full items-center justify-start gap-4"
        >
          <div>Icon</div>
          <div className="text-2xl text-slate-200 hover:text-blue-400">
            profile
          </div>
        </Link>
      </div>
    </div>
  );
}
