import { GetUserDetail } from "@/app/service/user-service";
import { redirect } from "next/navigation";

export default async function EditProfile({
  params,
}: {
  params: { username: string };
}) {
  const username = params.username;
  const userDetail = await GetUserDetail({ username: username });
  if (!userDetail.isMyProfile) {
    redirect("/");
  }
  return <div>Edit Profile Page!</div>;
}
