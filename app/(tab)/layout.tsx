import TitleBar from "@/components/window-components/title-bar";

export default async function RootLayOut({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full w-full flex-col gap-8">
      <TitleBar />
      <div className="flex h-full w-full">{children}</div>
    </div>
  );
}
