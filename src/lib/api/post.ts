"use client";

import { useMutation } from "@tanstack/react-query";
import { howl } from "../utils";

export const useCreatePost = () =>
  useMutation({
    mutationKey: ["post"],
    mutationFn: async (data: {
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
      const response = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      return result;
    },
  });
