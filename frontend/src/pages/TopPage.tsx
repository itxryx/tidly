import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/tabs"
import { CircularProgress } from "@/components/ui/circular-progress"
import { useState } from "react"

export default function TopPage() {
  // Posts Section Component
  const PostsSection = () => {
    const [postText, setPostText] = useState("");
    const maxLength = 200;
    const currentLength = new TextEncoder().encode(postText).length; // UTF-8バイト数を計算
    const isOverLimit = currentLength > maxLength;
    
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="bg-secondary/20 p-4 border-b border-border">
          <h2 className="text-xl font-bold text-accent-foreground">Posts</h2>
        </div>
        
        <div className="p-5">
          <div className="border-b border-border pb-5 mb-5">
            <Textarea 
              className={`mb-3 resize-none bg-background/50 focus:bg-background/80 transition-colors ${isOverLimit ? 'border-destructive' : ''}`}
              placeholder="What's on your mind?"
              style={{ height: '140px' }}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              maxLength={maxLength * 2} // 余裕を持たせる
            />
            <div className="flex items-center gap-3">
              <Button 
                className="bg-primary hover:bg-primary/80 text-primary-foreground"
                disabled={currentLength === 0 || isOverLimit}
              >
                Post
              </Button>
              <CircularProgress 
                value={currentLength} 
                max={maxLength} 
                size={28} 
                warningThreshold={70}
                errorThreshold={90}
              />
              <span className={`text-xs ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {currentLength}/{maxLength} bytes
              </span>
            </div>
          </div>
        
        <div className="space-y-4">
          <div className="bg-background border border-border p-4 rounded-lg hover:shadow-md transition-shadow">
            <p className="mb-2">投稿内容のサンプル1</p>
            <p className="text-sm text-muted-foreground">
              2025/01/01 12:34
            </p>
          </div>
          
          <div className="bg-background border border-border p-4 rounded-lg hover:shadow-md transition-shadow">
            <p className="mb-2">投稿内容のサンプル2</p>
            <p className="text-sm text-muted-foreground">
              2025/01/02 15:45
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  }

  // Board Section Component
  const BoardSection = () => {
    const [boardText, setBoardText] = useState("これはボードのテキスト内容です。\n自由に編集してボタンを押すと内容が更新されます。\n\n- 項目1\n- 項目2\n- 項目3\n\nメモやタスクを管理するのに最適です。");
    
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="bg-secondary/20 p-4 border-b border-border">
          <h2 className="text-xl font-bold text-accent-foreground">Board</h2>
        </div>
        
        <div className="p-5">
          <Textarea 
            className="mb-3 resize-none bg-background/50 focus:bg-background/80 transition-colors" 
            placeholder="Enter text on board"
            style={{ height: '60vh' }}
            value={boardText}
            onChange={(e) => setBoardText(e.target.value)}
          />
          <Button className="bg-primary hover:bg-primary/80 text-primary-foreground">
            Update
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-primary mb-6">Dashboard</h1>
      
      {/* モバイル表示用のタブ */}
      <div className="md:hidden">
        <Tabs defaultValue="posts">
          <TabList className="mb-4 p-1.5 mx-auto max-w-xs">
            <TabTrigger value="posts" className="rounded-full font-medium">
              Posts
            </TabTrigger>
            <TabTrigger value="board" className="rounded-full font-medium">
              Board
            </TabTrigger>
          </TabList>
          <TabContent value="posts" className="transition-all duration-500 transform">
            <div className="animate-in fade-in-50 slide-in-from-left-3 duration-500">
              <PostsSection />
            </div>
          </TabContent>
          <TabContent value="board" className="transition-all duration-500 transform">
            <div className="animate-in fade-in-50 slide-in-from-right-3 duration-500">
              <BoardSection />
            </div>
          </TabContent>
        </Tabs>
      </div>
      
      {/* タブレット/PC表示用の2ペイン */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <div className="animate-in fade-in-0 slide-in-from-left-5 duration-500 delay-100">
          <PostsSection />
        </div>
        <div className="animate-in fade-in-0 slide-in-from-right-5 duration-500 delay-200">
          <BoardSection />
        </div>
      </div>
    </div>
  )
}