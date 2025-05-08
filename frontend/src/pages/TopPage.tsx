import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabList, TabTrigger, TabContent } from "@/components/ui/tabs"
import { CircularProgress } from "@/components/ui/circularProgress"
import React, { useState, useEffect } from "react"

export default function TopPage() {
  const PostsSection = () => {
    const [postText, setPostText] = useState("");
    const [posts, setPosts] = useState<Array<{content: string, timestamp: string}>>([]);
    const maxLength = 200;
    const currentLength = new TextEncoder().encode(postText).length;
    const isOverLimit = currentLength > maxLength;
    
    const handlePost = () => {
      if (postText.trim() === "" || isOverLimit) return;
      
      const now = new Date();
      const timestamp = now.toLocaleString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      }).replace(/\//g, '/');
      
      const content = postText;
      
      setPostText("");
      
      setTimeout(() => {
        setPosts(prevPosts => [{ content, timestamp }, ...prevPosts]);
      }, 0);
    };
    
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="bg-secondary/20 p-4 border-b border-border">
          <h2 className="text-xl font-bold text-accent-foreground">Posts</h2>
        </div>
        
        <div className="p-5">
          <div className="border-b border-border pb-5 mb-5">
            <Textarea 
              className={`mb-3 resize-none bg-background/50 focus:bg-background/80 transition-colors ${isOverLimit ? 'border-destructive' : ''}`}
              placeholder="No need to tidy up your words... (Cmd+Enter to post)"
              style={{ height: '140px' }}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              maxLength={maxLength * 2}
              onKeyDown={(e) => {
                if ((e.metaKey) && e.key === 'Enter') {
                  e.preventDefault();
                  handlePost();
                }
              }}
            />
            <div className="flex items-center gap-3">
              <Button 
                className="bg-primary hover:bg-primary/80 text-primary-foreground"
                disabled={currentLength === 0 || isOverLimit}
                onClick={handlePost}
              >
                Post
              </Button>
              <CircularProgress 
                value={currentLength} 
                max={maxLength} 
                size={28} 
                warningThreshold={70}
                errorThreshold={90}
                key={`progress-${postText.length}`}
              />
              <span className={`text-xs ${isOverLimit ? 'text-destructive' : 'text-muted-foreground'}`}>
                {currentLength}/{maxLength} bytes
              </span>
            </div>
          </div>
        
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

  const BoardSection = () => {
    const defaultText = "";
    const [boardText, setBoardText] = useState("");
    const [savedText, setSavedText] = useState("");
    const [isEdited, setIsEdited] = useState(false);
    const [lastUpdated, setLastUpdated] = useState<string | null>(null);
    
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setBoardText(e.target.value);
      setIsEdited(e.target.value !== savedText);
    };
    
    const handleUpdate = () => {
      if (boardText.trim() === "") return;
      
      setSavedText(boardText);
      setIsEdited(false);
      
      const now = new Date();
      setLastUpdated(now.toLocaleString("ja-JP"));
    };
    
    useEffect(() => {
      if (boardText === "" && savedText === "") {
        setBoardText(defaultText);
      }
    }, []);
    
    return (
      <div className="bg-card border border-border rounded-lg shadow-lg overflow-hidden">
        <div className="bg-secondary/20 p-4 border-b border-border flex justify-between items-center">
          <h2 className="text-xl font-bold text-accent-foreground">Board</h2>
          {lastUpdated && (
            <span className="text-xs text-muted-foreground">
              last updated: {lastUpdated}
            </span>
          )}
        </div>
        
        <div className="p-5">
          <Textarea 
            className="mb-3 resize-none bg-background/50 focus:bg-background/80 transition-colors" 
            placeholder="Scatter your tasks here... (Cmd+Enter to update)"
            style={{ height: '60vh' }}
            value={boardText}
            onChange={handleTextChange}
            onKeyDown={(e) => {
              if ((e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                if (isEdited && boardText.trim() !== "") {
                  handleUpdate();
                }
              }
            }}
          />
          <Button 
            className="bg-primary hover:bg-primary/80 text-primary-foreground"
            onClick={handleUpdate}
            disabled={!isEdited || boardText.trim() === ""}
          >
            Update
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
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
          <TabContent value="posts">
            <PostsSection />
          </TabContent>
          <TabContent value="board">
            <BoardSection />
          </TabContent>
        </Tabs>
      </div>
      
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        <div>
          <PostsSection />
        </div>
        <div>
          <BoardSection />
        </div>
      </div>
    </div>
  )
}