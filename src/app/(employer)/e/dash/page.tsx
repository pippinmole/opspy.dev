import { auth } from "@/auth";
import { SignIn } from "@/components/auth-components";
import Spinner from "@/components/cui/Spinner";
import ApplicationsTable from "@/components/dashboard/applications/applications-table";
import CompanyJobTable from "@/components/dashboard/employer/company-job-table";
import CompanyProfile from "@/components/jobs/company-profile";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getApplicationsForCompanyId } from "@/services/ApplicationService";
import { getCompanyWithOpeningsAndApplicationsById } from "@/services/JobService";
import { getUserWithCompanyById } from "@/services/UserService";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function EmployerDashboardPage() {
  const session = await auth();
  if (!session?.user) return <SignIn />;

  const user = await getUserWithCompanyById(session.user.id);
  if (!user || !user.company) return redirect("/e");

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CompanyProfile company={user.company} />

        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Employer Dashboard
          </h2>
          <div className="flex items-center space-x-2">
            <Button asChild>
              <Link href={"/jobs/new"}>
                <PlusIcon className={"w-4 h-4 mr-2"} />
                Add Job
              </Link>
            </Button>
          </div>
        </div>
        <Tabs defaultValue="jobs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="jobs">Job Postings</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
          </TabsList>
          <TabsContent value="jobs" className="space-y-4">
            <Suspense fallback={<Spinner />}>
              <JobTable companyId={user.company.id} />
            </Suspense>
          </TabsContent>
          <TabsContent value={"applications"} className="space-y-4">
            <Suspense fallback={<Spinner />}>
              <ServerApplicationsTable companyId={user.company.id} />
            </Suspense>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

async function JobTable({ companyId }: { companyId: number }) {
  const company = await getCompanyWithOpeningsAndApplicationsById(companyId);
  if (!company) return <div>Company not found.</div>;

  return <CompanyJobTable data={company} />;
}

async function ServerApplicationsTable({ companyId }: { companyId: number }) {
  const applications = await getApplicationsForCompanyId(companyId);

  return <ApplicationsTable data={applications} />;
}