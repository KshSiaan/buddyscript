import Stories from "./_home/stories";
import CreatePost from "./_home/post/create-post";
import Posts from "./_home/post/posts";
import { Suspense } from "react";
export default function Home() {
  return (
    <div className="space-y-4">
      <Suspense>
        <Stories />
      </Suspense>
      <div className="w-full">
        <Suspense>
          <CreatePost />
        </Suspense>
      </div>
      {/* <Suspense> */}
      <Posts />
      {/* </Suspense> */}
    </div>
  );
}
