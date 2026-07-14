import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rejectResponse } from "@/lib/extra";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";


export async function DELETE(request: NextRequest,{ params }: { params: Promise<{ id: string }> },) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.session) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }

  const postID = (await params)?.id;

    if (!postID || typeof postID !== "string") {
        return rejectResponse({ error: "Invalid post_id" });
    }
    try{
        const getPost = await db.select().from(post).where(eq(post.id, postID)).limit(1);
        if(getPost.length === 0){
            return rejectResponse({ error: "Post not found", status: 404 });
        }
        if(getPost[0].authorId !== session.user.id){
            return rejectResponse({ error: "You are not authorized to delete this post", status: 403 });
    }
    }
    catch(error){
        return rejectResponse({ error: "Failed to fetch post", additional_error: error });
    }
}