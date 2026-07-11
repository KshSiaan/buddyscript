import { Badge } from "@/components/ui/badge";
import {
  Analytics01Icon,
  Bookmark01Icon,
  GameIcon,
  PlayCircle02Icon,
  SaveIcon,
  Settings01Icon,
  UserAdd01Icon,
  UserMultiple03Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import React from "react";

// Learning
// New
// Insights
// Find friends
// Bookmarks
// Group
// Gaming
// New
// Settings
// Save post
export default function SideNav() {
  const navs = [
    {
      icon: PlayCircle02Icon,
      label: "Learning",
      new: true,
    },
    {
      icon: Analytics01Icon,
      label: "Insights",
      new: false,
    },
    {
      icon: UserAdd01Icon,
      label: "Find friends",
      new: false,
    },
    {
      icon: Bookmark01Icon,
      label: "Bookmarks",
      new: false,
    },
    {
      icon: UserMultiple03Icon,
      label: "Group",
      new: false,
    },
    {
      icon: GameIcon,
      label: "Gaming",
      new: true,
    },
    {
      icon: Settings01Icon,
      label: "Settings",
      new: false,
    },
    {
      icon: SaveIcon,
      label: "Save post",
      new: false,
    },
  ];
  return (
    <div className="flex flex-col gap-2 w-full h-full">
      {navs.map((nav) => (
        <Link
          href={`#`}
          key={nav.label}
          className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg justify-between"
        >
          <div className="whitespace-nowrap flex items-center gap-4">
            <HugeiconsIcon icon={nav.icon} /> {nav.label}
          </div>
          {nav.new && (
            <Badge className="bg-accent-foreground hover:bg-accent-foreground/80">
              New
            </Badge>
          )}
        </Link>
      ))}
    </div>
  );
}
