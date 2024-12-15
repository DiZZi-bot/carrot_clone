import {
  GetUserDetail,
  getUserProfileInformation,
} from "@/app/service/user-service";
import EditProfileForm from "@/components/form-components/edit-profile-form";
import { notFound } from "next/navigation";

export default async function EditProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const paramUser = await GetUserDetail({ username: username });
  const sessionUser = await getUserProfileInformation();

  if (sessionUser.id !== paramUser.id) {
    notFound();
  }

  return (
    <div className="flex w-full flex-col gap-8 bg-background">
      <EditProfileForm initialUserInformation={sessionUser} />
    </div>
  );
}
