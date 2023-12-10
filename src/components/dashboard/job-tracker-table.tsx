"use client";

import { DataTable } from "@/components/table/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { JobTracker } from ".prisma/client";
import {
  CheckIcon,
  CircleIcon,
  CrossIcon,
  LucideIcon,
  ShieldQuestionIcon,
  TimerIcon,
} from "lucide-react";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { JobTrackerWithPost } from "@/services/jobTrackerService";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type JobTrackerTableProps = {
  data: JobTrackerWithPost[];
};

export default function JobTrackerTable(props: JobTrackerTableProps) {
  return <DataTable columns={columns} data={props.data} />;
}

export const statuses: {
  value: JobTracker["status"];
  label: string;
  icon?: LucideIcon;
}[] = [
  {
    value: "INTERESTED",
    label: "Interested",
    icon: ShieldQuestionIcon,
  },
  {
    value: "APPLIED",
    label: "Applied",
    icon: CircleIcon,
  },
  {
    value: "INTERVIEWING",
    label: "Interviewing",
    icon: TimerIcon,
  },
  {
    value: "REJECTED",
    label: "Rejected",
    icon: CrossIcon,
  },
  {
    value: "OFFERED",
    label: "Offered",
    icon: CrossIcon,
  },
  {
    value: "ACCEPTED",
    label: "Accepted",
    icon: CheckIcon,
  },
];

export const columns: ColumnDef<JobTrackerWithPost>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "job.title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
    cell: ({ row }) => {
      return <div className="">{row.original.job.title}</div>;
    },
    enableSorting: true,
    enableHiding: false,
    accessorFn: (row) => row.job.title,
  },
  {
    accessorKey: "company",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => {
      return (
        <div className={"flex flex-row"}>
          <Avatar className={"w-4 h-4 my-auto mr-2"}>
            <AvatarImage
              src={
                row.original.job.company.logoUrl ??
                "https://google.com/favicon.ico"
              }
              alt={row.original.job.company.name}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          {row.original.job.company.name}
        </div>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.original.status,
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
