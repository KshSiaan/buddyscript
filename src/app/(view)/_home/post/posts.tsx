import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageHeader,
} from "@/components/ui/message";
import { fallbackAvatar } from "@/lib/extra";
import {
  Comment03Icon,
  Image02Icon,
  MoreVerticalCircle01Icon,
  SentIcon,
  Share01Icon,
  ThumbsUpEllipseIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";

export default async function Posts() {
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar size="lg">
            <AvatarImage
              src={
                "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
              }
            />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>{" "}
          <div className="">
            <h4>Raven</h4>
            <p className="text-xs text-muted-foreground">5 mins ago</p>
          </div>
        </div>
        <Button variant="ghost" size="icon-sm">
          <HugeiconsIcon icon={MoreVerticalCircle01Icon} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="text-sm" id="text_content">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate
          dolore id sint asperiores repudiandae cumque, earum perferendis
          voluptatibus dolores iste dignissimos vitae? Sint eum voluptatum
          illum! Debitis suscipit dolorem a.
        </div>
        <div className="" id="image_content"></div>
      </CardContent>
      <CardFooter className="grid grid-cols-3 gap-4">
        <button
          type="button"
          className="w-full p-2 flex justify-center items-center gap-2 text-xs font-light text-muted-foreground hover:text-primary hover:bg-primary/10  transition-colors rounded-lg"
        >
          <HugeiconsIcon icon={ThumbsUpEllipseIcon} size={20} /> Like
        </button>
        <button
          type="button"
          className="w-full p-2 flex justify-center items-center gap-2 text-xs font-light text-muted-foreground hover:text-accent-foreground hover:bg-accent-foreground/10 transition-colors rounded-lg"
        >
          <HugeiconsIcon icon={Comment03Icon} size={20} />
          Comment
        </button>
        <button
          type="button"
          className="w-full p-2 flex justify-center items-center gap-2 text-xs font-light text-muted-foreground hover:text-yellow-600 hover:bg-yellow-600/10 transition-colors rounded-lg"
        >
          <HugeiconsIcon icon={Share01Icon} size={20} /> Share
        </button>
      </CardFooter>
      <CardContent className="">
        <div className="flex items-center gap-2 justify-between">
          <InputGroup>
            <InputGroupInput
              placeholder="Write a comment..."
              className="text-xs!"
            />
            <InputGroupAddon>
              <Avatar size="sm">
                <AvatarImage
                  src={
                    "https://api.dicebear.com/10.x/lorelei/svg?backgroundColor=ffffff&seed=Felix"
                  }
                />
                <AvatarFallback>UI</AvatarFallback>
              </Avatar>
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              <Button size="icon-sm" variant="ghost">
                <HugeiconsIcon icon={Image02Icon} />
              </Button>
            </InputGroupAddon>
          </InputGroup>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-accent-foreground hover:text-background transition-colors"
          >
            <HugeiconsIcon icon={SentIcon} />
          </Button>
        </div>
        <button
          type="button"
          className="text-xs py-2 text-muted-foreground hover:text-primary my-2"
        >
          View Comments (4)
        </button>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src={fallbackAvatar} alt="user#1" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </MessageAvatar>
          <MessageContent>
            <Bubble variant="outline">
              <BubbleContent className="text-xs text-muted-foreground">
                <div className="flex items-center text-xs text-foreground font-semibold">
                  John Doe
                </div>
                How can I help you today? lorem ipsum dolor sit amet consectetur
                adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam,olor sit amet consectetur
                adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam,olor sit amet consectetur
                adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam,olor sit amet consectetur
                adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam,olor sit amet consectetur
                adipisicing elit. Quisquam, quod. Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Quisquam,
              </BubbleContent>
            </Bubble>
          </MessageContent>
        </Message>
      </CardContent>
    </Card>
  );
}
