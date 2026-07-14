"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { useDeletePost, useGetPosts } from "@/hooks/api/post";
import { fallbackMyAvatar, timeAgoGenerate } from "@/lib/extra";
import { MoreVerticalCircle01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AlertTriangleIcon } from "lucide-react";
import Actions from "./actions";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession } from "@/lib/auth-client";

export default function Posts() {
  const { data: session } = useSession();
  const { data, isPending, isError, error, isRefetching } = useGetPosts();
  const { mutate: deletePost, isPending: isDeletePending } = useDeletePost();

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-32">
        <Spinner />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert>
        <AlertTriangleIcon />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error?.message}</AlertDescription>
      </Alert>
    );
  }

  return data?.data?.map((post) => (
    <Card key={post.id}>
      <CardHeader className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar size="lg">
            <AvatarImage src={post.author.image ?? fallbackMyAvatar} />
            <AvatarFallback>UI</AvatarFallback>
          </Avatar>{" "}
          <div className="">
            <h4>{post.author.name}</h4>
            <p className="text-xs text-muted-foreground">
              {timeAgoGenerate(new Date(post.createdAt))}
            </p>
          </div>
        </div>
        {session?.user.id === post.authorId && (
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="ghost" size="icon-sm" />}
            >
              <HugeiconsIcon icon={MoreVerticalCircle01Icon} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                variant="destructive"
                disabled={isDeletePending}
                onClick={() => deletePost(post.id)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-sm line-clamp-4" id="text_content">
          {post.text}
        </div>
        <div className="" id="image_content"></div>
      </CardContent>
      <Actions post={post} isRefetching={isRefetching} />
    </Card>
  ));
}
