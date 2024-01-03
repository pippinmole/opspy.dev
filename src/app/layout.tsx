import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import MainHeader from "@/components/MainHeader";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import NavigationProgressBar from "@/components/nav-progress-bar";
import { auth } from "@/auth";
import knock from "@/lib/knock";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  let knockUser;

  if (session && session.user) {
    knockUser = await knock.users.identify(session?.user.id, {
      name: session?.user.name ?? undefined,
      email: session?.user.email ?? undefined,
    });

    console.log(knockUser);
  }

  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <NextAuthSessionProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <NavigationProgressBar />
            <MainHeader />

            <div className={"max-w-[90rem] mx-auto mt-14"}>{children}</div>

            <Toaster />
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
