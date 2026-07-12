"use client";
import React, { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Attachment02Icon,
  Calendar03Icon,
  ClipIcon,
  Image02Icon,
  LicenseIcon,
  SentIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
export default function CreatePost() {
  const [expanded, setExpanded] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (expanded && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [expanded]);

  return (
    <ExpandableScreen
      onExpandChange={setExpanded}
      layoutId="cta-card"
      triggerRadius="100px"
      contentRadius="0px"
    >
      <div className="w-full">
        <ExpandableScreenTrigger className="w-full">
          <div className="p-4 bg-card rounded-lg w-full hover:border-primary border-2 border-transparent transition-colors cursor-pointer">
            <div className="flex gap-2 items-center justify-start">
              <Avatar size="lg">
                <AvatarImage
                  src={
                    "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
              <div className="text-muted-foreground text-sm">
                Write something..
              </div>
            </div>
            <div className="w-full h-full flex items-center justify-between pt-4">
              <div className="space-x-2">
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon icon={Image02Icon} className="text-rose-600" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon icon={Video01Icon} className="text-blue-500" />
                </Button>
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon
                    icon={Calendar03Icon}
                    className="text-green-600"
                  />
                </Button>
              </div>
              <div className="space-x-2">
                <Button variant="ghost" size="icon-sm">
                  <HugeiconsIcon
                    icon={LicenseIcon}
                    className="text-purple-600"
                  />
                </Button>
                <Button size="icon-sm">
                  <HugeiconsIcon icon={SentIcon} />
                </Button>
              </div>
            </div>
          </div>
        </ExpandableScreenTrigger>
      </div>

      <ExpandableScreenContent className="bg-card">
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center gap-2 justify-start border-b pb-4 mb-4">
            <Avatar size="lg">
              <AvatarImage
                src={
                  "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
                }
              />
              <AvatarFallback>UI</AvatarFallback>
            </Avatar>{" "}
            RAVEN
          </div>
          <textarea
            className="border-0! flex-1 ring-0! outline-0! resize-none scroll-fade-y scrollbar-none bg-transparent w-full text-sm font-light"
            ref={textareaRef}
            placeholder="Write here..."
          />
          <div className="w-full flex justify-between lg:justify-end items-center gap-4">
            <div className="space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-light text-rose-600"
              >
                <HugeiconsIcon icon={Image02Icon} className="" />
                <span className="hidden lg:block">Image</span>
              </Button>
              <Button
                variant="ghost"
                className="text-blue-500 text-xs font-light"
                disabled
                size="sm"
              >
                <HugeiconsIcon icon={Video01Icon} />
                <span className="hidden lg:block">Video</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="text-green-600 text-xs font-light"
              >
                <HugeiconsIcon icon={Calendar03Icon} />
                <span className="hidden lg:block">Event</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                disabled
                className="text-purple-600 text-xs font-light"
              >
                <HugeiconsIcon icon={LicenseIcon} />
                <span className="hidden lg:block">Article</span>
              </Button>
            </div>
            <Button>
              Post <HugeiconsIcon icon={SentIcon} />
            </Button>
          </div>
        </div>
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
