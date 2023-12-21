import { z } from "zod";

export const onboardingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.date().max(new Date(), "Date of birth must be in the past"),
  // workExperience: z.array(z.object({
  //   roleTitle: z.string().min(1, 'Role title is required'),
  //   company: z.string().min(1, 'Company name is required'),
  //   startDate: z.date().max(new Date(), 'Start date must be in the past'),
  //   endDate: z.date().max(new Date(), 'End date must be in the past'),
  //   description: z.string().min(1, 'Description is required'),
  // }))
});