import { base_api_url } from "@/lib/utils";
import { ApiResponse } from "@/types/base";
export const postService = {
  createPost: async (data: {
    text: string;
    images: File[];
    is_private: boolean;
  }) => {
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

  getPosts: async (): Promise<ApiResponse<any[]>> => {
    const response = await fetch(`${base_api_url}/post`);
    const result = await response.json();
    console.log("getPosts result:", result);
    return result;
  },
};
