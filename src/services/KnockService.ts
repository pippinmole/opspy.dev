import knock, { applicationCreatedKnock } from "@/lib/knock";
import { JobPost, User } from "@prisma/client";
import { JobPostWithCompany } from "@/services/JobService";

export async function notifyApplicationCreated(
  user: User,
  job: JobPostWithCompany,
) {
  return await knock.notify(applicationCreatedKnock, {
    actor: user.id,
    recipients: [user.id],
    data: {
      // prettier-ignore
      "companyName": {
        // prettier-ignore
        "value": job.company.name,
      },
      // prettier-ignore
      "jobName": {
        // prettier-ignore
        "value": job.title,
      },
      // prettier-ignore
      "jobId": {
        // prettier-ignore
        "value": job.id,
      },
    },
  });
}
