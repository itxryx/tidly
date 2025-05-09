import type { Post } from "@/types"

interface PostListProps {
  posts: Post[];
  className?: string;
}

export function PostList({ posts, className = '' }: PostListProps) {
  return (
    <div className={`bg-card border border-border rounded-lg shadow-lg overflow-hidden h-full flex flex-col ${className}`}>
      <div className="p-4 flex-1 overflow-auto">
        <div className="space-y-4">
          {posts.length > 0 ? (
            posts.map((post, index) => (
              <div key={index} className="bg-background border border-border p-4 rounded-lg hover:shadow-md transition-shadow">
                <p className="mb-2 whitespace-pre-wrap">{post.content}</p>
                <p className="text-sm text-muted-foreground">
                  {post.timestamp}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center p-6 text-muted-foreground">
              No posts yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}