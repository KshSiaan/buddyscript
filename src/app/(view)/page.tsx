import Stories from "./_home/stories";
import CreatePost from "./_home/create-post";
import Posts from "./_home/posts";
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
