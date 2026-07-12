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
import { ChevronDown, SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import TabsUnderline from "./anim-tabs";

export default function Navbar() {
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
                <AvatarImage
                  src={
                    "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>{" "}
              Raven
              <HugeiconsIcon size="18" icon={ChevronDown} />
            </PopoverTrigger>
            <PopoverContent align="end" side="bottom" sideOffset={5}>
              <PopoverHeader>
                <PopoverTitle>RAVEN</PopoverTitle>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
}
