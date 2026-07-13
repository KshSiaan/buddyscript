import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rejectResponse } from "@/lib/extra";
import { createSupabaseStorageClient } from "@/lib/storage/supabase";


export async function POST(request: Request) {

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }

  const body = await request.formData();
  const text = body.get("text");
  const is_private = body.get("is_private");  
  const images = body.getAll("images") as File[];

  if (!text || typeof text !== "string") {
    return rejectResponse({ error: "Invalid text" });
  }
  if(text.length > 2000){
    return rejectResponse({ error: "Text is too long, maximum length is 2000 characters" });
  }
  for (const image of images) {
    if (!(image instanceof File)) {
      return rejectResponse({ error: "Invalid image file" });
    }
  }
  
  const storage = createSupabaseStorageClient().storage;

  const uploadedImages: string[] = [];
  for (const image of images) {
    const { data, error } = await storage
      .from("post").upload(`images/${Date.now()+Math.floor(Math.random() * 1000)}`, image, {
        cacheControl: "3600",
        upsert: false,
  });
    if (error) {
      return rejectResponse({ error: `Failed to upload image: ${error.message}` });
    }
    uploadedImages.push(data.fullPath);
  }

  // console.log({
  //   text,
  //   images: images.map((img) => (img instanceof File ? img.size : null)),
  //   is_private,
  // });

  try{
    const [newPost] = await db.insert(post).values({
      id: crypto.randomUUID(),
      text,
      images: uploadedImages,
      authorId:session.user.id,
    }).returning();

    return Response.json({
      ok: true,
      message: "Post created successfully",
      post_id: newPost.id
    });
  }catch(err){
    return rejectResponse({ error: "Failed to create post", additional_error: err, status: 500 });
  }
}


export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }

  // try{
  //   const posts = await 

}