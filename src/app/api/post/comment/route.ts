import { comments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rejectResponse } from "@/lib/extra";

export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
    if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }

  const body = await request.json();
  const post_id = body.post_id;
  const parent_comment_id = body.parent_comment_id;
  const comment_text = body.comment_text;

    if (!post_id || typeof post_id !== "string") {
    return rejectResponse({ error: "Invalid post_id" });
  }
    if (!comment_text || typeof comment_text !== "string") {
    return rejectResponse({ error: "Invalid comment_text" });
  }
  if(comment_text.trim().length > 5000){
    return rejectResponse({ error: "Comment text is too long, maximum length is 5000 characters" });
  }

  try{
    const createdPost = await db.insert(comments).values({id: crypto.randomUUID(), postId: post_id, userId: session.user.id, text: comment_text, parentId: parent_comment_id }).returning()
    if(createdPost.length === 0){
      return rejectResponse({ error: "Failed to create comment" });
    }
        return new Response(JSON.stringify({ok: true,  message: "Comment created successfully", comment_id: createdPost[0].id }));
    }catch (error) {
        return rejectResponse({ error: "Failed to create comment", additional_error: error });
    }
}

export async function GET(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
    if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }

}