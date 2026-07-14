import { Auth } from "better-auth/types";

export interface Post {
  author: Auth["$Infer"]["Session"]["user"];
  id: string;
  text: string;
  images: string[] | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  likes: number;
  isLiked: boolean;
  commentCount: number;
}
