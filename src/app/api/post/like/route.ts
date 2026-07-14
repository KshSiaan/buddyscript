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

  // const postData = db.select().from(post)
}
