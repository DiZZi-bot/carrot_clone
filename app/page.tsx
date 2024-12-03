import TweetList from "@/components/tweet-list";
import { getInitialTweets } from "./service/tweet-service";
import Link from "next/link";
import { GetUser } from "./profile/page";

export default async function Home() {
  const user = await GetUser();
  const tweets = await getInitialTweets();
  return (
    <div className="flex h-screen w-full items-start justify-center gap-4 bg-gray-900 p-10 text-white">
      <div className="w-[200px] rounded-2xl bg-slate-700 p-5">
        <div className="flex items-center justify-center gap-4">
          <div className="h-24 w-24 rounded-full bg-slate-300"></div>
          <div className="text-2xl">{user.username}</div>
        </div>
        <Link href="/make-tweet-dev">
          <div className="mt-4 text-center text-blue-400 underline hover:text-blue-600">
            (dev)make tweet
          </div>
        </Link>
      </div>

      <div className="h-1/2 w-[600px] rounded-2xl bg-slate-700">
        <TweetList initialTweets={tweets} />
      </div>
    </div>
  );
}
