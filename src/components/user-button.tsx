import { auth } from "@/auth";
import { getUserWithCompanyById } from "@/lib/data/user";
import {
  adminDashboardUrl,
  employerDashboardUrl,
  settingsUrl,
  talentDashboardUrl,
} from "@/lib/pages";
import { Cloud, CreditCard, Github, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SignIn, SignOut } from "./auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default async function UserButton() {
  const session = await auth();
  if (!session?.user) return <SignIn />;

  const user = await getUserWithCompanyById(session.user.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative w-8 h-8 rounded-full my-auto"
          id={"test-user-menu"}
        >
          <Avatar className="w-8 h-8">
            <AvatarImage
              src={user?.image ?? "default_profile_picture.svg"}
              alt={"Profile picture"}
              height={32}
              width={32}
              asChild
            >
              <Image
                src={user?.image ?? "default_profile_picture.svg"}
                alt={"Profile picture"}
                width={32}
                height={32}
              />
            </AvatarImage>
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className={"my-0 pb-0"}>
          {session.user.name}
        </DropdownMenuLabel>
        <DropdownMenuLabel className={"text-xs text-muted-foreground pt-0.5"}>
          {session.user.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link
              href={user?.company ? employerDashboardUrl : talentDashboardUrl}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          {user?.isSuperUser && (
            <>
              <DropdownMenuItem asChild>
                <Link href={adminDashboardUrl}>
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Admin</span>
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </Link>
              </DropdownMenuItem>
            </>
          )}

          <DropdownMenuItem asChild>
            <Link href={settingsUrl}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem disabled>
          <Github className="mr-2 h-4 w-4" />
          <span>GitHub</span>
        </DropdownMenuItem>
        {/*<DropdownMenuItem>*/}
        {/*  <LifeBuoy className="mr-2 h-4 w-4" />*/}
        {/*  <span>Support</span>*/}
        {/*</DropdownMenuItem>*/}
        <DropdownMenuItem disabled>
          <Cloud className="mr-2 h-4 w-4" />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
