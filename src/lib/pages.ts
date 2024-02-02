import { absoluteUrl } from "@/lib/utils";
import { filterJobPostsSchema } from "@/schemas/jobPost";
import { JobApplication } from "@prisma/client";
import { z } from "zod";

export const newJobUrl = absoluteUrl("/e/new-job");
export const employerDashboardUrl = absoluteUrl("/e/dash");
export const employerHomepageUrl = absoluteUrl("/e");
export const talentDashboardUrl = absoluteUrl("/t/dash");
export const applicationUrl = (applicationId: JobApplication["id"]) =>
  absoluteUrl(`/e/applications/${applicationId}`);
export const jobUrl = (jobId: JobApplication["id"]) =>
  absoluteUrl(`/jobs?jid=${jobId}`);
export const jobsUrl = absoluteUrl("/jobs");
export function filteredJobsUrl(filter?: z.infer<typeof filterJobPostsSchema>) {
  if (!filter) {
    return absoluteUrl("/jobs");
  }

  const searchParams = new URLSearchParams();

  if (filter.cid) {
    searchParams.append("cid", filter.cid);
  }

  return absoluteUrl(`/jobs?${searchParams.toString()}`);
}
export const pricingUrl = absoluteUrl("/pricing");
export const talentWelcomeUrl = absoluteUrl("/t/welcome");
export const companiesUrl = absoluteUrl("/companies");
export const settingsUrl = absoluteUrl("/settings");
export const homeUrl = absoluteUrl("/");
export const companyUrl = (companyId: string) =>
  absoluteUrl(`/companies/${encodeURI(companyId)}`);
