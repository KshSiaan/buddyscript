"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
// import { Box, Settings, Activity, Link2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BubbleChatIcon,
  HomeIcon,
  Notification01Icon,
  UserGroup03Icon,
} from "@hugeicons/core-free-icons";
// import { useRouter } from "next/navigation";

const tabs = [
  {
    id: "overview",
    href: "/",
    icon: <HugeiconsIcon icon={HomeIcon} className="size-6" />,
  },
  {
    id: "friends",
    href: "/friends",
    icon: <HugeiconsIcon icon={UserGroup03Icon} className="size-6" />,
  },
  {
    id: "notifications",
    href: "/notifications",
    icon: <HugeiconsIcon icon={Notification01Icon} className="size-6" />,
  },
  {
    id: "chat",
    href: "/chat",
    icon: <HugeiconsIcon icon={BubbleChatIcon} className="size-6" />,
  },
];

const variants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

const transition = {
  type: "spring",
  stiffness: 340,
  damping: 32,
};

export default function TabsUnderline() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [direction, setDirection] = useState(1);
  // const navig = useRouter();
  const handleTabChange = (newId: string) => {
    const prevIdx = tabs.findIndex((t) => t.id === activeTab);
    const nextIdx = tabs.findIndex((t) => t.id === newId);
    setDirection(nextIdx > prevIdx ? 1 : -1);
    setActiveTab(newId);
    // navig.push(tabs.find((t) => t.id === newId)?.href || "/");
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full"
      >
        <TabsList
          variant="line"
          className="flex w-full no-visible-scrollbar! border-b border-border bg-transparent p-0! rounded-none h-auto! gap-0! justify-start!"
          onMouseLeave={() => setHoveredTab(null)}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            const isHovered = hoveredTab === tab.id;

            return (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onMouseEnter={() => setHoveredTab(tab.id)}
                className={cn(
                  "relative flex items-center justify-center cursor-pointer  text-sm font-medium transition-colors outline-none whitespace-nowrap bg-transparent",
                  "data-[state=active]:bg-transparent data-[state=active]:text-foreground",
                  "dark:data-[state=active]:bg-transparent dark:data-[state=active]:border-transparent dark:data-[state=active]:text-foreground",
                  "border-transparent data-[state=active]:border-transparent shadow-none data-[state=active]:shadow-none after:hidden",
                  isActive
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <span className="relative flex items-center gap-2 w-12 justify-center py-3 rounded-md z-10">
                  {isHovered && (
                    <motion.span
                      layoutId="tabs-05-hover"
                      className="absolute inset-0 bg-muted/70 rounded-md pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{Icon}</span>
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tabs-05-indicator"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-primary"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}
