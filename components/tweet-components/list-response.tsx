import { UserCircleIcon as ProfileIcon } from "@heroicons/react/24/outline";
import { formatToTimeAgo } from "@/lib/utils";

interface ListResPonseProps {
  response: {
    user: {
      id: number;
      username: string;
    };
    id: number;
    created_at: Date;
    response: string;
  };
}

export default function ListResponse({ response }: ListResPonseProps) {
  return (
    <div className="flex items-center gap-3 px-3 py-4">
      <ProfileIcon className="size-12 text-secondary-font" />
      <div className="text-base font-semibold">
        <div className="flex items-center gap-3">
          <div>{response.user.username}</div>
          <div className="text-sm text-secondary-font">
            {formatToTimeAgo(response.created_at.toString())}
          </div>
        </div>
        <div>{response.response}</div>
      </div>
    </div>
  );
}
