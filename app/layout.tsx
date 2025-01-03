import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex h-screen items-center justify-center bg-secondary font-inter text-font">
        <div className="h-[900px] w-[450px] rounded-[4rem] bg-black p-5">
          <div className="flex h-full w-full flex-col rounded-[3rem] bg-background p-5">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
