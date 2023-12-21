"use client";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { UseFormReturn } from "react-hook-form";
import { onboardingSchema } from "@/schemas/onboardingSchema";
import { z } from "zod";

export type OnboardingCardProps = {
  form: UseFormReturn<z.infer<typeof onboardingSchema>>;
};

export default function GettingStarted({ form }: OnboardingCardProps) {
  return (
    <>
      <CardHeader>
        <CardTitle>Getting started</CardTitle>
        <CardDescription>
          First, we need to know a few basic things about you.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className={"space-y-8"}>
          <div className={"flex flex-row space-x-2"}>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className={"flex-grow"}>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Saul" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name={"lastName"}
              control={form.control}
              render={({ field }) => (
                <FormItem className={"flex-grow"}>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Goodman" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </CardContent>
    </>
  );
}