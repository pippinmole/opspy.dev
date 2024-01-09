import { auth } from "@/auth";
import PreferencesForm from "@/components/settings/preferences-form";
import { ProfileForm } from "@/components/settings/profile-form";
import ProfileFormSkeleton from "@/components/settings/profile-form-skeleton";
import { Separator } from "@/components/ui/separator";
import knock from "@/lib/knock";
import { getUserWithCvsById, UserWithCvs } from "@/services/UserService";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function SettingsProfilePage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserWithCvsById(session.user.id);
  if (!user) return redirect("/t/welcome");

  return (
    <div className={"space-y-8"}>
      <Suspense fallback={<ProfileFormSkeleton />}>
        <ProfilePage user={user} />
      </Suspense>

      <Suspense fallback={<>Loading...</>}>
        <NotificationsPage user={user} />
      </Suspense>
    </div>
  );
}

async function ProfilePage({ user }: PageProps) {
  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator className={"mt-3 mb-6"} />

      <ProfileForm user={user} />
    </div>
  );
}

async function NotificationsPage({ user }: PageProps) {
  const preferences = await knock.users.getPreferences(user.id, {
    preferenceSet: "default",
  });

  return (
    <div>
      <div>
        <h3 className="text-2xl font-bold tracking-tight">Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Control how you want to be notified.
        </p>
      </div>

      <Separator className={"mt-3 mb-6"} />

      <PreferencesForm preferences={preferences} />
    </div>
  );
}

type PageProps = {
  user: UserWithCvs;
};
