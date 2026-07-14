import { likes } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rejectResponse } from "@/lib/extra";
import { eq,and } from "drizzle-orm";
export async function POST(request: Request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });
  if (!session?.session || !session.user.id) {
    return rejectResponse({ error: "Unauthorized", status: 401 });
  }
  const body = await request.json();
  const post_id = body.post_id;
  if (!post_id ) {
    return rejectResponse({ error: "Invalid post_id" });
  }

  try{
    const existingLike = await db.select().from(likes).where(and(eq(likes.postId, post_id), eq(likes.userId, session.user.id))).limit(1).execute();
    if (existingLike.length > 0) {
    try{
      const removedLike = await db.delete(likes).where(and(eq(likes.postId, post_id), eq(likes.userId, session.user.id))).execute();
      if (removedLike.rowCount === 0) {
        return rejectResponse({ error: "Failed to remove like" });
      }
      return new Response(JSON.stringify({ok: true,  message: "Like removed" }));
    }catch (error) {
      return rejectResponse({ error: "Failed to remove like" });
    
    }
    }else{
      const newLike = await db.insert(likes).values({id: crypto.randomUUID(), postId: post_id, userId: session.user.id }).execute();
      if (newLike.rowCount === 0) {
        return rejectResponse({ error: "Failed to add like" });
      }
      return new Response(JSON.stringify({ ok: true, message: "Like added" }));
    }
  }
  catch (error) {
    return rejectResponse({ error: "Failed to check existing like" });
  }
}
