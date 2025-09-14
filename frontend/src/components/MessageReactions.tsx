import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface MessageReactionsProps {
  messageId: string;
  reactions?: {
    upvotes: number;
    downvotes: number;
    userReaction?: 'up' | 'down' | null;
  };
  onReact?: (messageId: string, reaction: 'up' | 'down') => void;
}

export const MessageReactions: React.FC<MessageReactionsProps> = ({
  messageId,
  reactions = { upvotes: 0, downvotes: 0, userReaction: null },
  onReact
}) => {
  const [currentReaction, setCurrentReaction] = useState(reactions.userReaction);
  const [upvotes, setUpvotes] = useState(reactions.upvotes);
  const [downvotes, setDownvotes] = useState(reactions.downvotes);

  const handleReaction = (type: 'up' | 'down') => {
    if (currentReaction === type) {
      // Remove reaction
      setCurrentReaction(null);
      if (type === 'up') {
        setUpvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev - 1);
      }
    } else {
      // Change or add reaction
      const prevReaction = currentReaction;
      setCurrentReaction(type);
      
      if (type === 'up') {
        setUpvotes(prev => prev + 1);
        if (prevReaction === 'down') {
          setDownvotes(prev => prev - 1);
        }
      } else {
        setDownvotes(prev => prev + 1);
        if (prevReaction === 'up') {
          setUpvotes(prev => prev - 1);
        }
      }
    }
    
    onReact?.(messageId, type);
  };

  return (
    <div className="flex items-center space-x-1 mt-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('up')}
        className={`h-6 px-2 text-xs ${
          currentReaction === 'up' 
            ? 'text-accent bg-accent/20' 
            : 'text-muted-foreground hover:text-accent'
        }`}
      >
        <ThumbsUp className="w-3 h-3 mr-1" />
        {upvotes > 0 && upvotes}
      </Button>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleReaction('down')}
        className={`h-6 px-2 text-xs ${
          currentReaction === 'down' 
            ? 'text-destructive bg-destructive/20' 
            : 'text-muted-foreground hover:text-destructive'
        }`}
      >
        <ThumbsDown className="w-3 h-3 mr-1" />
        {downvotes > 0 && downvotes}
      </Button>
    </div>
  );
};