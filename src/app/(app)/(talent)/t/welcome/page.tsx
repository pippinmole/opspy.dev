import { auth } from "@/auth";
import { getUserById } from "@/lib/data/user";
import { homeUrl, talentDashboardUrl } from "@/lib/pages";
import { redirect } from "next/navigation";
import OnboardingCard from "./_components/onboarding";

export const metadata = {
  title: "Welcome",
};

export default async function OnboardingPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return redirect(homeUrl);
  }

  const user = await getUserById(session.user.id);
  if (!user || user.isOnboard) {
    return redirect(talentDashboardUrl);
  }

  return <OnboardingCard />;
}
