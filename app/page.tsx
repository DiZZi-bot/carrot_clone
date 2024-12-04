import TweetList from "@/components/tweet-list";
import { getInitialTweets } from "./service/tweet-service";
import MenuBar from "@/components/menu-bar";
import AddTweet from "@/components/add-tweet";

export default async function Home() {
  const tweets = await getInitialTweets();
  return (
    <div className="flex h-screen w-full items-start justify-center gap-3 bg-gray-900 text-white">
      <MenuBar />
      <div className="flex h-full w-[600px] flex-col gap-2">
        <div className="bg-slate-700 px-8 py-5 text-2xl font-bold">Home</div>
        <AddTweet />
        <TweetList initialTweets={tweets} />
      </div>
    </div>
  );
}
