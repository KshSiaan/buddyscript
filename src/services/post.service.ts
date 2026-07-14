import { base_api_url } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
import { Post } from "@/types/post";
import { Auth } from "better-auth";
export const postService = {
  createPost: async (data: {
    text: string;
    images: File[];
    is_private: boolean;
  }): Promise<ApiResponse<undefined>> => {
    const formData = new FormData();
    formData.append("text", data.text);
    formData.append("is_private", String(data.is_private));
    if (data.images && data.images.length > 0) {
      data.images.forEach((image) => {
        formData.append("images", image);
      });
    }
    const response = await fetch(`${base_api_url}/post`, {
      method: "POST",
      body: formData,
    });
    const result = await response.json();
    return result;
  },

  getPosts: async (): Promise<ApiResponse<Post[]>> => {
    const response = await fetch(`${base_api_url}/post`);
    const result = await response.json();
    return result;
  },
  getPrivatePosts: async (): Promise<ApiResponse<Post[]>> => {
    const response = await fetch(`${base_api_url}/post?private=true`);
    const result = await response.json();
    return result;
  },
  deletePost: async (post_id: string): Promise<ApiResponse<undefined>> => {
    const response = await fetch(`${base_api_url}/post/${post_id}`, {
      method: "DELETE",
    });
    const result = await response.json();
    return result;
  },

  toggleLike: async (post_id: string): Promise<ApiResponse<undefined>> => {
    const response = await fetch(`${base_api_url}/post/like`, {
      method: "POST",
      body: JSON.stringify({ post_id }),
    });
    const result = await response.json();
    return result;
  },

  // comment functions
  createComment: async (data: {
    post_id: string;
    parent_comment_id?: string;
    comment_text: string;
  }): Promise<ApiResponse<undefined>> => {
    const response = await fetch(`${base_api_url}/post/comment`, {
      method: "POST",
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  },
  getComments: async (
    post_id: string,
  ): Promise<
    ApiResponse<
      {
        id: string;
        parentId?: string;
        postId: string;
        userId: string;
        text: string;
        createdAt: string;
        user: Auth["$Infer"]["Session"]["user"];
      }[]
    >
  > => {
    const response = await fetch(`${base_api_url}/post/comment/${post_id}`);
    const result = await response.json();
    return result;
  },
};
