import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fallbackAvatar } from "@/lib/extra";
import { CheckIcon, PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import Link from "next/link";

export default function EventList() {
  const events = [
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
    <div className="flex flex-col gap-4 divide-y">
      {events.map((event) => (
        <div
          className="flex flex-col items-center gap-2 justify-between pb-4 last-of-type:pb-0"
          key={event.name}
        >
          <div className="w-full">
            <div className="w-full aspect-video rounded-lg relative overflow-hidden">
              <Image
                fill
                unoptimized
                src="https://images.unsplash.com/photo-1783597165290-8ebe8a01a76e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Event Image"
              />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2 w-full">
            <div className="aspect-square bg-accent-foreground rounded-lg flex flex-col justify-center items-center text-background font-semibold">
              <span className="text-xl font-bold">10</span>
              Jun
            </div>
            <div className="col-span-3 line-clamp-3 text-sm font-semibold text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quod. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Quisquam, quod.
            </div>
          </div>
          <div className="flex justify-between items-center w-full text-xs">
            <p>17 People Going</p>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-accent-foreground text-accent-foreground! bg-accent-foreground/10 hover:bg-accent-foreground/20 transition-colors"
            >
              Going <HugeiconsIcon icon={CheckIcon} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
