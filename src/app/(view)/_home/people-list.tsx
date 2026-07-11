import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fallbackAvatar } from "@/lib/extra";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";

export default function PeopleList() {
  const users = [
    {
      name: "John Doe",
      role: "Software Engineer",
    },
    {
      name: "Jane Smith",
      role: "Product Manager",
    },
    {
      name: "Alice Johnson",
      role: "UX Designer",
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      {users.map((user) => (
        <Link href="#" className="" key={user.name}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center justify-between">
              <Avatar size="lg">
                <AvatarImage src={fallbackAvatar} />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  Software Engineer
                </p>
              </div>
            </div>
            <Button
              size="icon-xs"
              className="hover:bg-accent-foreground hover:text-background transition-colors"
              variant="outline"
            >
              <HugeiconsIcon icon={PlusSignIcon} />
            </Button>
          </div>
        </Link>
      ))}
    </div>
  );
}
