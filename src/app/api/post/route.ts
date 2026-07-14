import { comments, likes, post, user } from "@/db/schema";
import { eq, and, exists, getTableColumns, desc, count } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rejectResponse } from "@/lib/extra";
import { createSupabaseStorageClient } from "@/lib/storage/supabase";
import { NextRequest } from "next/server";
import { SupabaseClient } from "@supabase/supabase-js";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }

  const body = await request.formData();
  const rawText = body.get("text");

  const text = typeof rawText === "string" ? rawText.trim() : "";
  const is_private = body.get("is_private");
  const images = body.getAll("images") as File[];

  if (images.length > 5) {
    return rejectResponse({ error: "You can upload a maximum of 5 images" });
  }
  for (const image of images) {
    if (!(image instanceof File)) {
      return rejectResponse({ error: "Invalid image file" });
    }
  }
  if (images.length === 0 || !images) {
    if (!text || typeof text !== "string" || text.trim() === "") {
      return rejectResponse({
        error: "Post text or Image is required",
      });
    }
  }

  const storage = createSupabaseStorageClient().storage;

  const uploadedImages: string[] = [];
  for (const image of images) {
    const { data, error } = await storage
      .from("post")
      .upload(
        `images/${Date.now() + Math.floor(Math.random() * 1000)}`,
        image,
        {
          cacheControl: "3600",
          upsert: false,
        },
      );
    if (error) {
      return rejectResponse({
        error: `Failed to upload image: ${error.message}`,
      });
    }
    uploadedImages.push(data.fullPath);
  }

  // console.log({
  //   text,
  //   images: images.map((img) => (img instanceof File ? img.size : null)),
  //   is_private,
  // });

  try {
    const [newPost] = await db
      .insert(post)
      .values({
        id: crypto.randomUUID(),
        text,
        is_private: is_private === "true",
        images: uploadedImages,
        authorId: session.user.id,
      })
      .returning();

    return Response.json({
      ok: true,
      message: "Post created successfully",
      post_id: newPost.id,
    });
  } catch (err) {
    return rejectResponse({
      error: "Failed to create post",
      additional_error: err,
      status: 500,
    });
  }
}

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }
  const storage = createSupabaseStorageClient().storage;
  try {
    const whereCondition =
      request.nextUrl.searchParams.get("private") === "true"
        ? and(eq(post.authorId, session.user.id), eq(post.is_private, true))
        : eq(post.is_private, false);

    const posts = await db
      .select({
        ...getTableColumns(post),
        author: getTableColumns(user),
        likes: count(likes.id),
        isLiked: exists(
          db
            .select({ id: likes.id })
            .from(likes)
            .where(
              and(eq(likes.postId, post.id), eq(likes.userId, session.user.id)),
            ),
        ),
        commentCount: count(comments.id),
      })
      .from(post)
      .where(whereCondition)
      .leftJoin(user, eq(user.id, post.authorId))
      .leftJoin(likes, eq(likes.postId, post.id))
      .leftJoin(comments, eq(comments.postId, post.id))
      .groupBy(post.id, user.id)
      .orderBy(desc(post.createdAt))
      .limit(48);

    const deliverablePosts = posts.map((post) => ({
      ...post,
      images: (post.images ?? []).map(
        (image) =>
          `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image}`,
      ),
    }));
    return Response.json({
      ok: true,
      message: "Posts fetched successfully",
      data: deliverablePosts,
    });
  } catch (err) {
    return rejectResponse({
      error: "Failed to fetch posts",
      additional_error: err,
      status: 500,
    });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }

  const postId = request.nextUrl.searchParams.get("postId");
}
