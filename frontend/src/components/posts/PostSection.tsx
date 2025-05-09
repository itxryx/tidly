import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CircularProgress } from "@/components/ui/circularProgress"
import { useState } from "react"
import type { Post } from "@/types"

interface PostSectionProps {
  className?: string;
  onPostCreated: (post: Post) => void;
}

export function PostSection({ className = '', onPostCreated }: PostSectionProps) {
  const [postText, setPostText] = useState("");
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
      minute: "2-digit",
      second: "2-digit"
    }).replace(/\//g, '/');
    
    const content = postText;
    
    setPostText("");
    onPostCreated({ content, timestamp });
  };
  
  return (
    <div className={`bg-card border border-border rounded-lg shadow-lg overflow-hidden ${className}`}>
      <div className="bg-secondary/20 p-4 border-b border-border">
        <h2 className="text-xl font-bold text-accent-foreground">Posts</h2>
      </div>
      
      <div className="p-4">
        <Textarea 
          className={`mb-3 resize-none bg-background/50 focus:bg-background/80 transition-colors ${isOverLimit ? 'border-destructive' : ''}`}
          placeholder="No need to tidy up your words... (Cmd+Enter to post)"
          style={{ height: '75px' }}
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
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
          <Button 
            className="bg-primary hover:bg-primary/80 text-primary-foreground w-auto"
            disabled={currentLength === 0 || isOverLimit}
            onClick={handlePost}
            size="sm"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}