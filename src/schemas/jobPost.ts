import { Currency, JobType, WorkMode } from "@prisma/client";
import { z } from "zod";

export const createJobPostSchema = z
  .object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(255, "Title must be less than 255 characters"),
    description: z
      .string()
      .min(1, "Description is required")
      .max(5_000, "Description must be less than 255 characters"),
    minSalary: z.coerce
      .number()
      .min(0, "Minimum salary must be greater than 0"),
    maxSalary: z.coerce.number(),
    location: z.string().min(1, "Location is required"),
    currency: z.nativeEnum(Currency),
    type: z.nativeEnum(JobType),
    workMode: z.nativeEnum(WorkMode),
  })
  .refine(
    (data) => {
      return data.minSalary <= data.maxSalary;
    },
    {
      message: "Minimum salary must be less than maximum salary",
      path: ["maxSalary"],
    },
  );
