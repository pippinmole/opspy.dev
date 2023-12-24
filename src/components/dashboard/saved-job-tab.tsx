import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getSavedJobsForUserId } from "@/services/JobService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PinIcon } from "lucide-react";
import SavedJobTable from "@/components/dashboard/saved-job-table";
import { TabsContent } from "../ui/tabs";

type SavedJobsTabProps = {
  value: string;
};

export default async function SavedJobTab(props: SavedJobsTabProps) {
  const session = await auth();
  if (!session || !session.user) return redirect("/");
  const savedJobs = await getSavedJobsForUserId(session.user.id);

  return (
    <TabsContent value={props.value} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>

            <PinIcon className={"h-4 w-4 text-muted-foreground"} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedJobs.length}</div>
            <p className="text-xs text-muted-foreground">
              +20% from last month
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Saved Jobs</CardTitle>
          </CardHeader>
          <CardContent className="px-4">
            <SavedJobTable data={savedJobs} />
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
