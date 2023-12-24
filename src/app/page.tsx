import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import { getUserWithCompanyById } from "@/services/userService";

export default async function Home() {
  const session = await auth();
  if (!session) return signIn();

  const user = await getUserWithCompanyById(session.user.id);
  if (!user) return;

  const isEmployer = user.company !== undefined;

  if (isEmployer) return redirect("/e/dashboard");
  return redirect("/t/dashboard");
}
