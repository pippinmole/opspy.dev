"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { updateProfile } from "@/app/(app)/settings/_actions";
import BasicProfile from "@/app/(app)/settings/_components/basic-profile";
import LinksForm from "@/app/(app)/settings/_components/links-form";
import WorkExperienceForm from "@/app/(app)/settings/_components/work-experience-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { UserWithCvs } from "@/lib/data/user.types";
import { updateProfileFormSchema } from "@/schemas/updateProfileSchema";
import { Loader2, SaveIcon } from "lucide-react";
import { useEffect } from "react";
import { z } from "zod";

type ProfileFormProps = {
  user: UserWithCvs;
};

export function ProfileForm({ user }: ProfileFormProps) {
  const form = useForm<z.infer<typeof updateProfileFormSchema>>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      dateOfBirth: user.dateOfBirth,
      bio: user.bio ?? "",
      githubLink: user.githubLink ?? "",
      linkedInLink: user.linkedinLink ?? "",
      twitterLink: user.twitterLink ?? "",
      workExperience:
        user.workExperience.map((experience) => ({
          jobTitle: experience.title,
          company: experience.company,
          location: experience.location ?? "",
          startDate: new Date(experience.startDate),
          endDate: experience.endDate ? new Date(experience.endDate) : null,
          description: experience.description ?? "",
        })) ?? [],
    },
  });

  const {
    formState: { isSubmitting, isSubmitSuccessful, isDirty, errors },
  } = form;

  useEffect(() => {
    if (!isSubmitting && isSubmitSuccessful) {
      toast({
        variant: "default",
        title: "Success",
        description: "✅ Successfully updated profile!",
        duration: 3000,
      });
    }
  }, [isSubmitSuccessful, isSubmitting]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(async (data) => await updateProfile(data))}
        className="space-y-14 flex flex-col"
      >
        <BasicProfile form={form} user={user} />
        <LinksForm form={form} />
        <WorkExperienceForm form={form} />
        <SubmitButton isSubmitting={isSubmitting} />{" "}
      </form>
    </Form>
  );
}

const SubmitButton = ({ isSubmitting }: { isSubmitting: boolean }) => (
  <Button
    type="submit"
    disabled={isSubmitting}
    className={"ml-auto justify-end"}
  >
    {isSubmitting ? (
      <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </>
    ) : (
      <>
        <SaveIcon className="mr-2 h-4 w-4" />
        Save Profile
      </>
    )}
  </Button>
);
