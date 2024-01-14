import CompanyProfileWithOpenings from "@/components/jobs/company-profile-with-openings";
import { getCompaniesWithOpenings } from "@/services/CompanyService";
import { Suspense } from "react";

export const metadata = {
  title: "Companies",
};

export default function CompaniesPage() {
  return (
    <main className="flex min-h-screen flex-col p-14">
      <Suspense fallback={<p>Loading feed...</p>}>
        <CompanyFeed />
      </Suspense>
    </main>
  );
}

async function CompanyFeed() {
  const companies = await getCompaniesWithOpenings();

  return (
    <>
      <h1 className="text-2xl font-semibold pb-6">
        Explore Companies ({companies.length})
      </h1>

      <div className={"flex flex-col gap-y-3"}>
        {companies.map((company) => (
          <CompanyProfileWithOpenings company={company} key={company.id} />
        ))}
      </div>
    </>
  );
}
