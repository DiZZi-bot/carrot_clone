import {
  getInitialTweets,
  GetTweetTotalCount,
} from "../service/tweet-list-service";
import getSession from "@/lib/session";
import AddTweetButton from "@/components/window-components/add-tweet-button";
import TweetList from "@/components/window-components/tweet-list";
import Link from "next/link";
import { unstable_cache as nextCache } from "next/cache";

async function getCachedTweets(userId: number) {
  const cachedTweets = nextCache(getInitialTweets, ["tweet-list-status"], {
    tags: [`tweet-status-${userId}`],
  });
  return cachedTweets({ userId });
}

export default async function Home() {
  const userId = Number((await getSession()).id);

  const tweets = await getCachedTweets(userId);
  console.log(`cache ID = ${userId}`);
  const totalTweetCount = await GetTweetTotalCount();

  return (
    <div className="relative flex w-full gap-3 text-font">
      <div className="flex w-full flex-col gap-2">
        <TweetList
          initialTweets={tweets}
          userId={userId}
          totalTweetCount={totalTweetCount}
        />
      </div>
      <Link href={"/tweets"}>
        <AddTweetButton />
      </Link>
    </div>
  );
}
