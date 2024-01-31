import { JobApplication } from ".prisma/client";
import { absoluteUrl } from "@/lib/utils";
import {
  ApplicationWithJob,
  getApplicationById,
} from "@/services/ApplicationService";
import {
  UserWithCompany,
  getUserWithCompanyById,
} from "@/services/UserService";
import { User } from "@prisma/client";

export declare type AuthorizeSuccess<Output> = {
  authorized: true;
  data: Output;
};
export declare type AuthorizeError = {
  authorized: false;
};
export declare type AuthorizeReturnType<Success> =
  | AuthorizeSuccess<Success>
  | AuthorizeError;

export const newJobUrl = absoluteUrl("/e/new-job");
export const employerDashboardUrl = absoluteUrl("/e/dash");
export const employerHomepageUrl = absoluteUrl("/e");
export const talentDashboardUrl = absoluteUrl("/t/dash");
export const applicationUrl = (applicationId: JobApplication["id"]) =>
  absoluteUrl(`/e/applications/${applicationId}`);
export const jobUrl = (jobId: JobApplication["id"]) =>
  absoluteUrl(`/jobs?jid=${jobId}`);
export const jobsUrl = absoluteUrl("/jobs");
export const pricingUrl = absoluteUrl("/pricing");
export const talentWelcomeUrl = absoluteUrl("/t/welcome");
export const companiesUrl = absoluteUrl("/companies");
export const settingsUrl = absoluteUrl("/settings");
export const homeUrl = absoluteUrl("/");

export async function isAuthorizedForApplications(
  userId: User["id"],
  applicationId: JobApplication["id"],
): Promise<{
  application: ApplicationWithJob | null;
  isAuthorized: boolean;
}> {
  const [user, application] = await Promise.all([
    getUserWithCompanyById(userId),
    getApplicationById(applicationId),
  ]);

  const isAuthorized =
    user !== null &&
    application !== null &&
    user.company?.id === application.job.companyId;

  return {
    application: application,
    isAuthorized: isAuthorized,
  };
}

export async function isAuthorizedForEmployerDash(userId: User["id"]): Promise<
  AuthorizeReturnType<{
    user: UserWithCompany;
  }>
> {
  const user = await getUserWithCompanyById(userId);
  const isAuthorized = user !== null && user.company !== null;

  if (!isAuthorized) {
    return {
      authorized: false,
    };
  }

  return {
    data: {
      user,
    },
    authorized: true,
  };
}

export async function canCreateNewJobPost(userId: User["id"]): Promise<
  AuthorizeReturnType<{
    user: UserWithCompany;
  }>
> {
  const user = await getUserWithCompanyById(userId);

  let isAuthorized = user !== null && user.company !== null;

  if (!isAuthorized || !user) {
    return {
      authorized: false,
    };
  }

  return {
    data: {
      user,
    },
    authorized: true,
  };
}
