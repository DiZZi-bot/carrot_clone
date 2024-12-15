"use client";

import Link from "next/link";

interface FormLinkProps {
  href: string;
  basicText: string;
  linkText: string;
}

export default function Formlink({ href, basicText, linkText }: FormLinkProps) {
  return (
    <div>
      <span className="text-font">{basicText}</span>
      <Link
        className="text-link hover:text-link-hover pl-2 hover:underline"
        href={href}
      >
        {linkText}
      </Link>
    </div>
  );
}
