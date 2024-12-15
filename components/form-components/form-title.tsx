"use client";

interface FormTitleProps {
  text: string;
}

export default function FormTitle({ text }: FormTitleProps) {
  return (
    <div className="mb-6 flex items-center justify-center">
      <p className="text-3xl font-extrabold text-primary">{text}</p>
    </div>
  );
}
