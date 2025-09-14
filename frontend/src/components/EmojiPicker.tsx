import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Smile, Heart, Zap } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
  children: React.ReactNode;
}

const emojis = {
  smileys: ['😀', '😃', '😄', '😁', '😆', '😅', '🤣', '😂', '🙂', '🙃', '😉', '😊', '😇', '🥰', '😍', '🤩', '😘', '😗', '😚', '😙', '🥲', '😋', '😛', '😜', '🤪', '😝', '🤑', '🤗', '🤭', '🤫', '🤔', '🤐', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥'],
  hearts: ['❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❣️', '💕', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥️', '💌', '💋', '💍', '👑', '💎', '🌹', '🌺', '🌸', '🌼', '🌻', '🦋', '✨', '💫', '⭐', '🌟', '💖', '🥰', '😘', '😍', '🤩'],
  gestures: ['👍', '👎', '👌', '✌️', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', '👇', '☝️', '👋', '🤚', '🖐️', '✋', '🖖', '👏', '🙌', '🤲', '🤝', '🙏', '✍️', '💪', '🦾', '🦿', '🦵', '🦶', '👂', '🦻', '👃', '🧠', '🫀', '🫁', '🦷', '🦴', '👀', '👁️', '👅'],
};

const stickers = [
  '🎉', '🎊', '🎈', '🎁', '🎀', '🎂', '🍰', '🧁', '🍭', '🍬', '🍫', '🍿', '🍕', '🍔', '🌮', '🍜', '☕', '🍵', '🥤', '🍻', '🍷', '🥂', '🎵', '🎶', '🎤', '🎧', '📱', '💻', '📷', '🎮', '🚗', '✈️', '🏠', '🌈', '⚡', '🔥', '💯', '🆕', '🆒', '🎯'
];

export const EmojiPicker: React.FC<EmojiPickerProps> = ({ onEmojiSelect, children }) => {
  const [selectedCategory, setSelectedCategory] = useState('smileys');

  return (
    <Popover>
      <PopoverTrigger asChild>
        {children}
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 bg-mystical-card border-border" align="end">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-4 bg-secondary/20">
            <TabsTrigger value="smileys" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Smile className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="hearts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Heart className="w-4 h-4" />
            </TabsTrigger>
            <TabsTrigger value="gestures" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              👋
            </TabsTrigger>
            <TabsTrigger value="stickers" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Zap className="w-4 h-4" />
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="smileys" className="mt-4">
            <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
              {emojis.smileys.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-secondary/50"
                  onClick={() => onEmojiSelect(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="hearts" className="mt-4">
            <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
              {emojis.hearts.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-secondary/50"
                  onClick={() => onEmojiSelect(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="gestures" className="mt-4">
            <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
              {emojis.gestures.map((emoji, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-secondary/50"
                  onClick={() => onEmojiSelect(emoji)}
                >
                  {emoji}
                </Button>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="stickers" className="mt-4">
            <div className="grid grid-cols-8 gap-2 max-h-40 overflow-y-auto">
              {stickers.map((sticker, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-secondary/50"
                  onClick={() => onEmojiSelect(sticker)}
                >
                  {sticker}
                </Button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};