import { auth } from "@/auth";
import Spinner from "@/components/cui/Spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserWithCompanyById } from "@/lib/data/user";
import { DownloadIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AppliedJobsTab from "./_components/applied-jobs-tab";
import ProfileSetupAlert from "./_components/profile-setup-alert";
import SavedJobTab from "./_components/saved-job-tab";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  if (!session || !session.user || !session.user.id) return redirect("/");

  const user = await getUserWithCompanyById(session.user.id);
  if (user?.company) return redirect("/e/dash");

  return (
    <div className={"container min-h-screen"}>
      {!!user && !user.isOnboard && <ProfileSetupAlert />}

      <div className="flex-1 space-y-4">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

          <div className="flex items-center space-x-2">
            <Button>
              <DownloadIcon className={"h-4 w-4 mr-2"} />
              Download
            </Button>
          </div>
        </div>
        <Tabs defaultValue="applications" className="space-y-4">
          <TabsList>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="saved-jobs">Saved Jobs</TabsTrigger>
          </TabsList>

          <Suspense fallback={<Spinner />}>
            <TabsContent value={"applications"} className="space-y-4">
              <AppliedJobsTab userId={session.user.id} />
            </TabsContent>
          </Suspense>

          <Suspense fallback={<Spinner />}>
            <TabsContent value={"saved-jobs"} className="space-y-4">
              <SavedJobTab userId={session.user.id} />
            </TabsContent>
          </Suspense>
        </Tabs>
      </div>
    </div>
  );
}
