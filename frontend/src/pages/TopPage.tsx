import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/tabs"
import { useState, useEffect } from "react"
import type { Post, Board } from "@/types"
import { PostSection } from "@/components/posts/PostSection"
import { PostList } from "@/components/posts/PostList"
import { BoardSection } from "@/components/board/BoardSection"

export default function TopPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [Board, setBoard] = useState<Board>({ content: "", lastUpdated: null });

  const handlePostCreated = (post: Post) => {
    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const handleBoardUpdate = (data: Board) => {
    setBoard(data);
  };

  // レスポンシブ対応のための共通コンポーネント
  const PostsContent = ({ className = '' }: { className?: string }) => (
    <div className={`flex flex-col ${className}`}>
      <div className="flex-shrink-0 mb-3">
        <PostSection onPostCreated={handlePostCreated} />
      </div>
      <div className="flex-1 overflow-auto">
        <PostList posts={posts} />
      </div>
    </div>
  );

  const BoardContent = ({ className = '' }: { className?: string }) => (
    <div className={`h-full ${className}`}>
      <BoardSection initialData={Board} onUpdate={handleBoardUpdate} />
    </div>
  );

  return (
    <div className="h-full flex flex-col overflow-hidden">
      
      {/* モバイル向けレイアウト */}
      <div className="md:hidden flex-1 overflow-hidden">
        <Tabs defaultValue="posts" className="h-full flex flex-col">
          <TabList className="flex-none mx-auto max-w-xs bg-card/30 p-1 rounded-full mb-2">
            <TabTrigger value="posts" className="rounded-full font-medium">
              Posts
            </TabTrigger>
            <TabTrigger value="board" className="rounded-full font-medium">
              Board
            </TabTrigger>
          </TabList>
          <TabContent value="posts" className="flex-1 overflow-hidden flex flex-col">
            <PostsContent />
          </TabContent>
          <TabContent value="board" className="flex-1 overflow-hidden flex flex-col">
            <BoardContent />
          </TabContent>
        </Tabs>
      </div>
      
      {/* デスクトップ向けレイアウト */}
      <div className="hidden md:flex md:gap-5 md:h-full md:justify-center md:mx-auto md:w-10/12 md:max-w-[1200px]">
        <PostsContent className="h-full w-[45%]" />
        <BoardContent className="h-full w-[45%]" />
      </div>
    </div>
  )
}