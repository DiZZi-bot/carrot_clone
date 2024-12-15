import { GetUserDetail, LogOut } from "@/app/service/user-service";
import { UserCircleIcon as ProfileIcon } from "@heroicons/react/24/outline";
import { ChatBubbleBottomCenterIcon as TweetIcon } from "@heroicons/react/24/outline";
import { ChatBubbleLeftRightIcon as ResponseIcon } from "@heroicons/react/24/outline";
import { HeartIcon as LikeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Profile({
  params,
}: {
  params: { username: string };
}) {
  const { username } = await params;
  console.log(`page.tsx - username: ${username}`);

  const userDetail = await GetUserDetail({ username: username });

  if (!userDetail) {
    return notFound();
  }
  if (!username) {
    return notFound();
  }

  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col gap-2 divide-y divide-border rounded-2xl bg-white p-5 text-2xl shadow">
        <div className="flex w-full items-center justify-between gap-3">
          <div className="flex items-center justify-center gap-2">
            <ProfileIcon className="size-20 text-secondary-font" />
            <div className="text-3xl font-extrabold">
              {userDetail?.username}
            </div>
          </div>
          {userDetail?.isMyProfile && (
            <div className="flex flex-col items-center justify-center font-semibold">
              <Link className="w-full" href={`${userDetail?.username}/edit`}>
                <button className="w-full rounded-lg bg-primary px-2 py-1.5 text-center text-xs text-white hover:bg-primary-hover">
                  Edit
                </button>
              </Link>
              <form action={LogOut}>
                <button className="w-full rounded-lg bg-secondary px-2 py-1.5 text-center text-xs text-white hover:bg-secondary-hover">
                  Log Out
                </button>
              </form>
            </div>
          )}
        </div>
        <div className="pt-2 text-center text-base text-secondary-font">
          {userDetail?.bio ? `${userDetail.bio}` : "No bio available."}
        </div>
      </div>
      <div className="flex w-full flex-col divide-y divide-border rounded-2xl bg-white px-8 py-5 text-lg font-bold shadow">
        <div className="pb-3">
          {userDetail.isMyProfile
            ? "My Timeline"
            : `${userDetail.username}'s Timeline`}
        </div>
        <div className="flex w-full justify-between px-5 pt-3">
          <TweetIcon className="size-10" />
          <ResponseIcon className="size-10" />
          <LikeIcon className="size-10" />
        </div>
      </div>
    </div>
  );
}
