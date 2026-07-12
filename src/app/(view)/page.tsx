import Stories from "./_home/stories";
import CreatePost from "./_home/post/create-post";
import Posts from "./_home/post/posts";
export default function Home() {
  return (
    <div className="space-y-4">
      <Stories />
      <div className="w-full">
        <CreatePost />
      </div>
      <Posts />
    </div>
  );
}
