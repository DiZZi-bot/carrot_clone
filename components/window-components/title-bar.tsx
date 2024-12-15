import {
  UserIcon,
  MagnifyingGlassIcon as SearchIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { GetUser } from "@/app/service/user-service";

export default async function TitleBar() {
  const user = await GetUser();
  return (
    <div className="flex w-full items-center justify-between">
      <Link href="/">
        <Image src="/images/nomad.png" alt="logo" width={40} height={40} />
      </Link>
      <div className="flex gap-2">
        <Link href="/search">
          <SearchIcon className="size-8" />
        </Link>
        <Link href={`/users/${user.username}`}>
          <UserIcon className="size-8" />
        </Link>
      </div>
    </div>
  );
}
