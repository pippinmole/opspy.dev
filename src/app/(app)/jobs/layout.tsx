import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/cui/breadcrumb";
import JobFilter from "@/components/jobs/job-filter";

type JobsLayoutProps = {
  children: React.ReactNode;
  jobs: React.ReactNode;
};

export default function JobsLayout({ children, jobs }: JobsLayoutProps) {
  return (
    <main className=" space-y-4 min-h-screen container">
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink href="/components">Jobs</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <JobFilter />

      <div className={"flex columns-2 gap-2"}>
        <div className={"w-[40%]"}>{jobs}</div>
        <div className={"w-[60%]"}>{children}</div>
      </div>
    </main>
  );
}