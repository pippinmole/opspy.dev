import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DownloadIcon } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SavedJobTab from "@/components/dashboard/saved-job-tab";
import AppliedJobsTab from "@/components/dashboard/applied-jobs-tab";
import { getUserWithCompanyById } from "@/services/userService";

export default async function DashboardPage() {
  const session = await auth();
  if (!session || !session.user) return redirect("/");

  const user = await getUserWithCompanyById(session.user.id);
  if (!user) return redirect("/t/welcome");
  if (user.company) return redirect("/e/dash");

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
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
            <TabsTrigger value="savedjobs">Saved Jobs</TabsTrigger>
          </TabsList>

          <AppliedJobsTab value={"applications"} />
          <SavedJobTab value={"savedjobs"} />
        </Tabs>
      </div>
    </>
  );
}
