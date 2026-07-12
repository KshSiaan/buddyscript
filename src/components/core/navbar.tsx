"use client";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
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
import { Auth } from "better-auth";
import { fallbackMyAvatar } from "@/lib/extra";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar({
  me,
}: {
  me: Auth["$Infer"]["Session"]["user"];
}) {
  const navs = [
    {
      icon: Settings01Icon,
      label: "Settings",
      danger: false,
    },
    {
      icon: InformationCircleIcon,
      label: "Help & Support",
      danger: false,
    },
    {
      icon: LogoutSquare01Icon,
      label: "Log Out",
      danger: true,
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
                      nav.danger && "hover:text-destructive",
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
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
