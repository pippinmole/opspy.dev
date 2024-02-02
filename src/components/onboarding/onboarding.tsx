"use client";

import GettingStarted from "@/components/onboarding/getting-started";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { setOnboarding } from "@/services/actions/onboarding";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Card, CardDescription } from "../ui/card";

type OnboardingCardProps = {
  email: string;
};

export default function OnboardingCard(props: OnboardingCardProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: new Date("November 12, 1960"),
      email: props.email,
      bio: "",
      location: "",
      linkedinUrl: "",
      githubUrl: "",
      portfolioUrl: "",
    },
  });

  const {
    formState: { isSubmitSuccessful, isSubmitting },
  } = form;

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast({
        variant: "default",
        title: "Onboarding",
        description: "✅ You have been onboarded successfully!",
        duration: 3000,
      });
    }
  }, [isSubmitSuccessful, toast]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => setOnboarding(data))}
        className="space-y-8"
      >
        <Card className="format lg:format-md max-w-2xl m-auto">
          <GettingStarted form={form} />

          <Separator />

          {/*<YourExperience form={form} />*/}

          {/*<Separator />*/}

          <CardDescription>
            <Button className={"w-full"} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                <>Climb aboard!</>
              )}
            </Button>
          </CardDescription>
        </Card>
      </form>
    </Form>
  );
}