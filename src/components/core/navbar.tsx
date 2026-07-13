"use client";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "../ui/popover";
import {
  ChevronDown,
  InformationCircleIcon,
  LogoutSquare01Icon,
  SearchIcon,
  Settings01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import TabsUnderline from "./anim-tabs";
import type { Auth } from "better-auth";
import { fallbackMyAvatar } from "@/lib/extra";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "@/lib/auth-client";
import { gooeyToast } from "../ui/goey-toaster";
import { useState } from "react";

export default function Navbar({
  me,
}: {
  me: Auth["$Infer"]["Session"]["user"];
}) {
  const [isLogingOut, setIsLoggingOut] = useState(false);
  const navs = [
    {
      icon: Settings01Icon,
      label: "Settings",
    },
    {
      icon: InformationCircleIcon,
      label: "Help & Support",
    },
  ];
  return (
    <nav className="bg-card px-[16%] h-16">
      <div className="flex items-center justify-between">
        <div className="text-lg font-bold text-foreground">
          <Image
            src="/svg/logo-text.svg"
            width={158}
            height={33}
            className="h-8"
            alt="buddyscript-logo"
          />
        </div>
        <InputGroup className="max-w-md rounded-full bg-muted px-1 ring-0! border-0!">
          <InputGroupInput
            placeholder="Search..."
            className="text-foreground placeholder:text-muted-foreground/50"
          />
          <InputGroupAddon>
            <HugeiconsIcon icon={SearchIcon} />
          </InputGroupAddon>
        </InputGroup>
        <div className="space-x-4 flex items-center justify-center">
          <TabsUnderline />
          <Popover>
            <PopoverTrigger className="flex mx-0! items-center gap-4 py-2 rounded-lg justify-center hover:bg-secondary px-3 font-semibold text-foreground/80">
              <Avatar size="default">
                <AvatarImage src={me?.image || fallbackMyAvatar} />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>{" "}
              Raven
              <HugeiconsIcon size="18" icon={ChevronDown} />
            </PopoverTrigger>
            <PopoverContent align="end" side="bottom" sideOffset={5}>
              <PopoverHeader>
                <div className="flex gap-2 items-center justify-start">
                  <Avatar size="lg">
                    <AvatarImage src={me?.image || fallbackMyAvatar} />
                  </Avatar>
                  <div className="flex flex-col">
                    <p className="font-semibold">{me?.name}</p>
                    <Link
                      href="/profile"
                      className="text-xs text-muted-foreground hover:text-primary"
                    >
                      View Profile
                    </Link>
                  </div>
                </div>
              </PopoverHeader>
              <div className="flex flex-col gap-2 w-full h-full">
                {navs.map((nav) => (
                  <Link
                    href={`#`}
                    key={nav.label}
                    className={cn(
                      `flex items-center gap-2 p-2 rounded-lg justify-between hover:text-primary`,
                    )}
                  >
                    <div className="whitespace-nowrap flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <HugeiconsIcon icon={nav.icon} size={20} />
                      </div>{" "}
                      {nav.label}
                    </div>
                  </Link>
                ))}

                <button
                  type="button"
                  disabled={isLogingOut}
                  onClick={async () => {
                    setIsLoggingOut(true);
                    const data = await signOut();
                    if (data.error) {
                      gooeyToast.error(
                        data.error.message || "Error signing out",
                      );
                      setIsLoggingOut(false);
                    } else {
                      gooeyToast.success("Signed out successfully");
                      window.location.href = "/auth/login";
                      setIsLoggingOut(false);
                    }
                  }}
                  className="p-2 whitespace-nowrap flex items-center gap-4 group hover:text-destructive"
                >
                  <div className="p-2 rounded-full bg-primary/10 text-primary group-hover:text-destructive! group-hover:bg-destructive/10 group">
                    <HugeiconsIcon icon={LogoutSquare01Icon} size={20} />
                  </div>{" "}
                  {isLogingOut ? "Signing out..." : "Sign Out"}
                </button>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
