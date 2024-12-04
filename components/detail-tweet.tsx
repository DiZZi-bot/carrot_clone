interface DetailTweetProps {
  username: string;
  tweet: string;
  created_at: string;
}

export default function DetailTweet({
  username,
  tweet,
  created_at,
}: DetailTweetProps) {
  return (
    <div className="flex w-full gap-4 text-2xl">
      <div>
        <div className="h-16 w-16 rounded-full bg-white"></div>
      </div>
      <div className="flex flex-col">
        <div className="mb-4">
          <div className="flex items-end gap-2">
            <span className="text-bold">{username}</span>
            <span className="text-lg text-slate-400">{created_at}</span>
          </div>
          <div className="w-[460px] break-words">{tweet}</div>
        </div>
        <div className="flex items-center justify-start gap-5 text-sm">
          <div>reply</div>
          <div>share</div>
          <div>like</div>
        </div>
      </div>
    </div>
  );
}
