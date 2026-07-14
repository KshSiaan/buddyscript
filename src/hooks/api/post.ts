"use client";

import { postService } from "@/services/post.service";
import type { ApiResponse } from "@/types/base";
import type { Post } from "@/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = () =>
  useMutation({
    mutationKey: ["post"],
    mutationFn: async (data: {
      text: string;
      images: File[];
      is_private: boolean;
    }) => {
      return postService.createPost(data);
    },
  });

export const useGetPosts = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      return postService.getPosts();
    },
});

export const useGetPrivatePosts = () =>
  useQuery({
    queryKey: ["privatePosts"],
    queryFn: async () => {
      return postService.getPrivatePosts();
    },
});


export const useLikePost = () => {
  return useMutation({
    mutationKey: ["toggleLikePost"],
    mutationFn: async (post_id: string) => {
      return postService.toggleLike(post_id);
    },
  });
};

export const useCreateComment = () => {
  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: async (data: {
      post_id: string;
      parent_comment_id?: string;
      comment_text: string;
    }) => {
      return postService.createComment(data);
    },
  });
};

export const useGetComment = ({post_id,opened}: { post_id: string; opened: boolean }) => {
  console.log("useGetComment called with post_id:", post_id, "opened:", opened);
  return useQuery({
    queryKey: ["getComments", `${post_id}-${opened}`], 
    queryFn: async () => {
      return postService.getComments(post_id);
    },
    enabled: !!post_id && opened,
  });
}

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["deletePost"],
    mutationFn: async (post_id: string) => {
      return postService.deletePost(post_id);
    }
    ,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["privatePosts"] });
    }
  });
}