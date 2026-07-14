import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fallbackMyAvatar } from "@/lib/extra";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

export default function PeopleList() {
  const users = [
    {
      name: "John Doe",
      role: "Software Engineer",
      active: false,
    },
    {
      name: "Jane Smith",
      role: "Product Manager",
      active: true,
    },
    {
      name: "Alice Johnson",
      role: "UX Designer",
      active: true,
    },
  ];
  return (
    <div className="flex flex-col gap-4">
      {users.map((user) => (
        <Link href="#" className="" key={user.name}>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center justify-between">
              <Avatar size="lg">
                <AvatarImage src={fallbackMyAvatar} />
              </Avatar>
              <div className="flex flex-col">
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
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
