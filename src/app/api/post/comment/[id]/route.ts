import { comments, user } from "@/db/schema";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { rejectResponse } from "@/lib/extra";
import { eq,getTableColumns } from "drizzle-orm";
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
){
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
        const getComments = await db.select({...getTableColumns(comments), user}).from(comments).where(eq(comments.postId, postID)).leftJoin(user, eq(user.id,comments.userId));
        return new Response(JSON.stringify({ok: true,  message: "Comments fetched successfully", data: getComments }));
    }catch (error) {
        return rejectResponse({ error: "Failed to fetch comments", additional_error: error });
    }
    
}