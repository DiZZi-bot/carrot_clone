import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function GetUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

export default async function Profile() {
  const user = await GetUser();
  const logOut = async () => {
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/log-in");
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="w-[600px] space-y-4 rounded-2xl bg-slate-700 p-10">
        <div className="mb-6 flex items-center justify-center">
          <p className="text-3xl font-extrabold text-white/90">
            Welcome! {user?.username}!
          </p>
        </div>
        <form action={logOut}>
          <button className="w-full text-right text-blue-400 underline hover:text-blue-600">
            Log Out
          </button>
        </form>
      </div>
    </div>
  );
}
