import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import MenuBar from "@/components/menu-bar";

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
    <div className="flex h-screen w-full items-start justify-center gap-3 bg-gray-900 text-white">
      <MenuBar />
      <div className="flex flex-col gap-2">
        <div className="bg-slate-700 px-8 py-5 text-2xl font-bold">Profile</div>
        <div className="h-full w-[600px] space-y-4 bg-slate-700 p-10">
          <div className="text-3xl font-extrabold text-white/90">Welcome!</div>
          <div className="flex flex-col gap-4 pt-6">
            <div>Username : {user?.username}</div>
            <div>email : {user?.email}</div>
          </div>
          <form action={logOut}>
            <button className="w-full text-right text-blue-400 underline hover:text-blue-600">
              Log Out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
