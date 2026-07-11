import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { fallbackAvatar } from "@/lib/extra";
import { SearchIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function FriendList() {
  const users = [
    {
      name: "Jane Smith",
      role: "Product Manager",
      active: true,
    },
    {
      name: "John Doe",
      role: "Software Engineer",
      active: false,
    },
    {
      name: "Alice Johnson",
      role: "UX Designer",
      active: true,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <InputGroup>
          <InputGroupInput placeholder="Search friends..." />
          <InputGroupAddon>
            <HugeiconsIcon icon={SearchIcon} />
          </InputGroupAddon>
        </InputGroup>
      </div>
      {users.map((user) => (
        <Link href="#" className="" key={user.name}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center justify-between">
              <Avatar size="lg">
                <AvatarImage src={fallbackAvatar} />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold flex items-center gap-1">
                  {user.name}{" "}
                  {user.active && (
                    <span className="size-2 bg-accent-foreground rounded-full" />
                  )}
                </p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground">
              {user.active ? "Online" : "5 mins ago"}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
