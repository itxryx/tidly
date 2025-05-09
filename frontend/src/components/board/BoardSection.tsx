import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import React, { useState, useEffect } from "react"
import type { Board } from "@/types"

interface BoardSectionProps {
  className?: string;
  initialData?: Board;
  onUpdate?: (data: Board) => void;
}

export function BoardSection({ className = '', initialData, onUpdate }: BoardSectionProps) {
  const defaultText = "";
  const [boardText, setBoardText] = useState(initialData?.content || "");
  const [savedText, setSavedText] = useState(initialData?.content || "");
  const [isEdited, setIsEdited] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(initialData?.lastUpdated || null);
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBoardText(e.target.value);
    setIsEdited(e.target.value !== savedText);
  };
  
  const handleUpdate = () => {
    if (boardText.trim() === "") return;
    
    setSavedText(boardText);
    setIsEdited(false);
    
    const now = new Date();
    const newLastUpdated = now.toLocaleString("ja-JP");
    setLastUpdated(newLastUpdated);
    
    if (onUpdate) {
      onUpdate({
        content: boardText,
        lastUpdated: newLastUpdated
      });
    }
  };
  
  useEffect(() => {
    if (boardText === "" && savedText === "") {
      setBoardText(defaultText);
    }
  }, [boardText, savedText, defaultText]);
  
  return (
    <div className={`bg-card border border-border rounded-lg shadow-lg overflow-hidden h-full flex flex-col ${className}`}>
      <div className="bg-secondary/20 p-4 border-b border-border flex justify-between items-center flex-shrink-0">
        <h2 className="text-xl font-bold text-accent-foreground">Board</h2>
        {lastUpdated && (
          <span className="text-xs text-muted-foreground">
            last updated: {lastUpdated}
          </span>
        )}
      </div>
      
      <div className="p-4 flex-1 flex flex-col overflow-hidden">
        <Textarea 
          className="mb-3 resize-none bg-background/50 focus:bg-background/80 transition-colors flex-1 min-h-0" 
          placeholder="Scatter your tasks here... (Cmd+Enter to update)"
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
        <div className="flex justify-end flex-shrink-0">
          <Button 
            className="bg-primary hover:bg-primary/80 text-primary-foreground w-auto"
            onClick={handleUpdate}
            disabled={!isEdited || boardText.trim() === ""}
            size="sm"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  );
}