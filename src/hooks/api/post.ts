"use client";

import { postService } from "@/services/post.service";
import type { ApiResponse } from "@/types/base";
import type { Post } from "@/types/post";
import { useMutation, useQuery } from "@tanstack/react-query";

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
    queryFn: async (): Promise<ApiResponse<Post[]>> => {
      return postService.getPosts();
    },
  });
