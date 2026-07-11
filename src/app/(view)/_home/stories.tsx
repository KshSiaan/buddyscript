import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fallbackAvatar } from "@/lib/extra";
import { PlusSignIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
export default function Stories() {
  return (
    <div className="h-48 w-full mt-4 overflow-x-auto overflow-y-hidden scrollbar-none">
      <div className="flex gap-4 w-max">
        <div className="size-42 shrink-0 bg-foreground rounded-lg overflow-hidden relative">
          <Image
            src="https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
            unoptimized
            alt="myAvatar"
            height={224}
            width={224}
            className="h-full w-full hover:brightness-50 transition-all cursor-grab active:cursor-grabbing"
          />
          <div className="bottom-0 left-0 w-full h-1/3 bg-foreground/50 absolute flex justify-center items-center">
            <Button
              size="icon-sm"
              className="absolute -top-1/4 rounded-full left-1/2 -translate-x-1/2"
            >
              <HugeiconsIcon icon={PlusSignIcon} />
            </Button>
            <p className="text-background font-semibold text-xs">Your story</p>
          </div>
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            className="size-42 shrink-0 bg-foreground rounded-lg overflow-hidden relative"
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            key={index}
          >
            <Avatar size="default" className={"absolute top-2 right-2 z-20"}>
              <AvatarImage src={fallbackAvatar} />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>
            <Image
              src="https://images.unsplash.com/photo-1783587325890-59067d788d9b?q=80&w=709&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="myAvatar"
              height={224}
              width={224}
              className="h-full w-full hover:brightness-50 transition-all cursor-grab active:cursor-grabbing"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
