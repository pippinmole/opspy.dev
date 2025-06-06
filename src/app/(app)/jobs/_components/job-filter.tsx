"use client";

import { OptionType } from "@/components/cui/multi-select";
import { Search } from "@/components/cui/search-input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { jobFilterSchema } from "@/lib/params";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const countries: OptionType[] = [
  {
    label: "United States",
    value: "us",
  },
  {
    label: "United Kingdom",
    value: "uk",
  },
  {
    label: "Canada",
    value: "ca",
  },
];

export default function JobFilter() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof jobFilterSchema>>({
    resolver: zodResolver(jobFilterSchema),
    defaultValues: {
      keywords: searchParams.get("keywords")?.toString(),
      minSalary: searchParams.get("minSalary")
        ? Number.parseFloat(searchParams.get("minSalary")!)
        : undefined,
      // countries: countries,
    },
  });

  function onSubmit(values: z.infer<typeof jobFilterSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    // Write to URL as search params.
    const params = new URLSearchParams(window.location.search);
    if (values.keywords) {
      params.set("keywords", values.keywords);
    } else {
      params.delete("keywords");
    }

    if (values.minSalary) {
      params.set("minSalary", values.minSalary.toString());
    } else {
      params.delete("minSalary");
    }

    // if (values.countries) {
    //   const keys = values.countries.map((c) => c.value).join(",");
    //   params.set("countries", keys);
    // } else {
    //   params.delete("countries");
    // }

    // Redirect to new URL.
    console.log("Going to redirect to", `${pathname}?${params.toString()}`);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={"flex w-full items-center space-x-2"}>
          <FormField
            control={form.control}
            name="keywords"
            render={({ field }) => (
              <FormItem className={"w-full"}>
                <FormLabel>&nbsp;</FormLabel>
                <FormControl>
                  <Search
                    className={"w-full"}
                    placeholder={"Job title, keywords or company"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="minSalary"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Salary</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="26000"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*<FormField*/}
          {/*  control={form.control}*/}
          {/*  name="countries"*/}
          {/*  render={({ field }) => (*/}
          {/*    <FormItem className="flex flex-col">*/}
          {/*      /!*<FormLabel>Language</FormLabel>*!/*/}
          {/*      <MultiSelect*/}
          {/*        selected={countries}*/}
          {/*        options={countries}*/}
          {/*        {...field}*/}
          {/*      />*/}
          {/*      <FormMessage />*/}
          {/*    </FormItem>*/}
          {/*  )}*/}
          {/*/>*/}

          {/*<FormField*/}
          {/*  control={form.control}*/}
          {/*  name="minSalary"*/}
          {/*  render={({ field }) => (*/}
          {/*    <FormItem>*/}
          {/*      <FormLabel> </FormLabel>*/}
          {/*      <FormControl>*/}
          {/*        <MultiSelect*/}
          {/*          values={[*/}
          {/*            {*/}
          {/*              key: "test",*/}
          {/*              value: "test",*/}
          {/*            },*/}
          {/*          ]}*/}
          {/*        />*/}
          {/*      </FormControl>*/}
          {/*      <FormMessage />*/}
          {/*    </FormItem>*/}
          {/*  )}*/}
          {/*/>*/}
          <Button type="submit" className={"hidden"}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
