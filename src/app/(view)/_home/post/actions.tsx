import { HugeiconsIcon } from "@hugeicons/react";
import React from "react";
import {
  Comment03Icon,
  Share01Icon,
  ThumbsUpEllipseIcon,
  Image02Icon,
  SentIcon,
} from "@hugeicons/core-free-icons";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";
import type { Post } from "@/types/post";
import { useCreateComment, useGetComment, useLikePost } from "@/hooks/api/post";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { fallbackMyAvatar } from "@/lib/extra";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { gooeyToast } from "goey-toast";
import { Spinner } from "@/components/ui/spinner";
import { useSession } from "@/lib/auth-client";
export default function Actions({
  post,
  isRefetching,
}: {
  post: Post;
  isRefetching: boolean;
}) {
  const qcl = useQueryClient();
  const { mutate: toggleLike, isPending } = useLikePost();
  const { mutate: createComment, isPending: isCreatingComment } =
    useCreateComment();
  const [isPostOpen, setIsPostOpen] = React.useState(false);
  const [commentText, setCommentText] = React.useState("");
  const { data: comments, isPending: isGettingComments } = useGetComment({
    post_id: post.id,
    opened: isPostOpen,
  });
  const { data: session } = useSession();

  const handleCreateComment = () => {
    if (!commentText.trim()) {
      return;
    }
    createComment(
      {
        post_id: post.id,
        comment_text: commentText.trim(),
      },
      {
        onSuccess: () => {
          setCommentText("");
          gooeyToast.success(
            `Commented successfully on ${post.author.name}'s post`,
          );
        },
      },
    );
  };
  return (
    <>
      {post.text.length > 500 && (
        <div className="text-xs -mt-4 px-6">
          <button
            type="button"
            className="text-primary hover:underline"
            onClick={() => setIsPostOpen(true)}
          >
            See more...
          </button>
        </div>
      )}
      <CardFooter className="grid grid-cols-3 gap-4">
        <button
          type="button"
          disabled={isPending || isRefetching}
          className={cn(
            "w-full p-2 flex justify-center items-center gap-2 text-xs font-light hover:text-primary transition-colors rounded-lg",
            post.isLiked ? "text-primary" : "text-muted-foreground",
            (isPending || isRefetching) && "animate-pulse cursor-wait",
          )}
          onClick={() =>
            toggleLike(post.id, {
              onSuccess: () => {
                qcl.invalidateQueries({
                  queryKey: ["posts"],
                });
              },
            })
          }
        >
          <HugeiconsIcon icon={ThumbsUpEllipseIcon} size={20} />{" "}
          {post.isLiked ? "Unlike" : `Like ${post?.likes > 1 ? "s" : ""}`}{" "}
          {post?.likes > 0 ? `(${post?.likes})` : ""}
        </button>
        <button
          type="button"
          className="w-full p-2 flex justify-center items-center gap-2 text-xs font-light text-muted-foreground hover:text-accent-foreground transition-colors rounded-lg"
          onClick={() => setIsPostOpen(true)}
        >
          <HugeiconsIcon icon={Comment03Icon} size={20} />
          Comment
        </button>
        <button
          type="button"
          className="w-full p-2 flex justify-center items-center gap-2 text-xs font-light text-muted-foreground hover:text-yellow-600 transition-colors rounded-lg"
        >
          <HugeiconsIcon icon={Share01Icon} size={20} /> Share
        </button>
      </CardFooter>
      <CardContent className="">
        <div className="flex items-center gap-2 justify-between">
          <InputGroup>
            <InputGroupInput
              placeholder="Write a comment..."
              disabled={isCreatingComment}
              className="text-xs!"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <InputGroupAddon>
              <Avatar size="sm">
                <AvatarImage src={post?.author?.image || fallbackMyAvatar} />
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
            onClick={handleCreateComment}
            disabled={isCreatingComment}
          >
            <HugeiconsIcon icon={SentIcon} />
          </Button>
        </div>
        <button
          type="button"
          className="text-xs py-2 text-muted-foreground hover:text-primary my-2"
          onClick={() => setIsPostOpen(true)}
        >
          View Comments (4)
        </button>
        <Message>
          <MessageAvatar>
            <Avatar>
              <AvatarImage src={fallbackMyAvatar} alt="user#1" />
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
      <Dialog open={isPostOpen} onOpenChange={setIsPostOpen}>
        <DialogContent className="min-w-[60dvw] max-h-[90dvh] overflow-y-auto ">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={fallbackMyAvatar} alt="user#1" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {post.author.name}'s Post
            </DialogTitle>
          </DialogHeader>
          <div className="">{post.text}</div>
          <div
            className={cn(
              "flex-1 space-y-6",
              comments?.data?.length &&
                comments?.data?.length > 0 &&
                "pt-4 border-t",
            )}
          >
            {isGettingComments ? (
              <div className="flex justify-center items-center h-32">
                <Spinner />
              </div>
            ) : (
              comments?.data.map((comment) => (
                <Message
                  key={comment.id}
                  align={session?.user?.id === comment.userId ? "end" : "start"}
                >
                  <MessageAvatar>
                    <Avatar>
                      <AvatarImage
                        src={comment.user.image || fallbackMyAvatar}
                        alt="user#1"
                      />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                  </MessageAvatar>
                  <MessageContent>
                    <Bubble variant="outline">
                      <BubbleContent className="text-xs text-muted-foreground">
                        <div className="flex items-center text-xs text-foreground font-semibold">
                          {comment.user.name}
                        </div>
                        {comment.text}
                      </BubbleContent>
                    </Bubble>
                  </MessageContent>
                </Message>
              ))
            )}
          </div>
          <div className="flex justify-between items-center gap-4">
            <InputGroup className="flex-1">
              <InputGroupInput
                placeholder="Write a comment..."
                className="text-xs!"
                value={commentText}
                disabled={isCreatingComment}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <InputGroupAddon>
                <Avatar size="sm">
                  <AvatarImage src={post?.author?.image || fallbackMyAvatar} />
                  <AvatarFallback>UI</AvatarFallback>
                </Avatar>
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <Button size="icon-sm" variant="ghost" disabled>
                  <HugeiconsIcon icon={Image02Icon} />
                </Button>
              </InputGroupAddon>
            </InputGroup>
            <Button onClick={handleCreateComment} disabled={isCreatingComment}>
              Post Comment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
