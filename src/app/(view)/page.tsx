import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Stories from "./_home/stories";
import {
  ExpandableScreen,
  ExpandableScreenContent,
  ExpandableScreenTrigger,
} from "@/components/ui/expandable-screen";
import { Button } from "@/components/ui/button";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar03Icon,
  Image02Icon,
  LicenseIcon,
  SentIcon,
  Video01Icon,
} from "@hugeicons/core-free-icons";
export default function Home() {
  return (
    <div className="">
      <Stories />
      <div className="w-full">
        <ExpandableScreen
          layoutId="cta-card"
          triggerRadius="100px"
          contentRadius="24px"
        >
          <div className="w-full">
            <ExpandableScreenTrigger className="w-full">
              <div className="p-4 bg-card rounded-lg w-full">
                <div className="flex gap-2 items-center justify-start">
                  <Avatar size="lg">
                    <AvatarImage
                      src={
                        "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
                      }
                    />
                    <AvatarFallback>UI</AvatarFallback>
                  </Avatar>
                  <div className="text-muted-foreground">Write something..</div>
                </div>
                <div className="w-full h-full flex items-center justify-between pt-4">
                  <div className="space-x-2">
                    <Button variant="ghost" size="icon-sm">
                      <HugeiconsIcon
                        icon={Image02Icon}
                        className="text-rose-600"
                      />
                    </Button>
                    <Button variant="ghost" size="icon-sm">
                      <HugeiconsIcon
                        icon={Video01Icon}
                        className="text-blue-500"
                      />
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

          <ExpandableScreenContent className="bg-primary">
            <div className="flex h-full items-center justify-center p-8">
              <h2 className="text-4xl text-primary-foreground">
                Full Screen Content
              </h2>
            </div>
          </ExpandableScreenContent>
        </ExpandableScreen>
      </div>
    </div>
  );
}
