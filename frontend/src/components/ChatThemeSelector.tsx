import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Palette, Check } from 'lucide-react';

interface ChatTheme {
  id: string;
  name: string;
  preview: string;
  background: string;
}

const chatThemes: ChatTheme[] = [
  { id: 'default', name: 'Default', preview: '💜', background: 'bg-mystical' },
  { id: 'cats', name: 'Cats', preview: '🐱', background: 'bg-gradient-to-br from-orange-100 to-yellow-100' },
  { id: 'puppies', name: 'Puppies', preview: '🐶', background: 'bg-gradient-to-br from-amber-100 to-orange-100' },
  { id: 'love', name: 'Love', preview: '❤️', background: 'bg-gradient-to-br from-pink-100 to-red-100' },
  { id: 'cosmic', name: 'Cosmic', preview: '🌌', background: 'bg-gradient-to-br from-purple-900 to-blue-900' },
  { id: 'nature', name: 'Nature', preview: '🌿', background: 'bg-gradient-to-br from-green-100 to-emerald-100' },
  { id: 'ocean', name: 'Ocean', preview: '🌊', background: 'bg-gradient-to-br from-blue-100 to-cyan-100' },
  { id: 'sunset', name: 'Sunset', preview: '🌅', background: 'bg-gradient-to-br from-orange-200 to-pink-200' },
  { id: 'forest', name: 'Forest', preview: '🌲', background: 'bg-gradient-to-br from-green-200 to-emerald-200' },
  { id: 'galaxy', name: 'Galaxy', preview: '✨', background: 'bg-gradient-to-br from-indigo-900 to-purple-900' },
  { id: 'cherry', name: 'Cherry Blossom', preview: '🌸', background: 'bg-gradient-to-br from-pink-100 to-rose-100' },
  { id: 'autumn', name: 'Autumn', preview: '🍂', background: 'bg-gradient-to-br from-yellow-200 to-orange-200' },
  { id: 'minimalist', name: 'Minimalist', preview: '⚪', background: 'bg-gradient-to-br from-gray-50 to-slate-100' },
  { id: 'neon', name: 'Neon', preview: '🌈', background: 'bg-gradient-to-br from-purple-400 to-pink-400' },
  { id: 'vintage', name: 'Vintage', preview: '🕰️', background: 'bg-gradient-to-br from-amber-100 to-yellow-100' }
];

interface ChatThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
  disabled?: boolean;
}

export const ChatThemeSelector: React.FC<ChatThemeSelectorProps> = ({
  currentTheme,
  onThemeChange,
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleThemeSelect = (themeId: string) => {
    onThemeChange(themeId);
    setIsOpen(false);
  };

  const currentThemeData = chatThemes.find(t => t.id === currentTheme) || chatThemes[0];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={disabled}
          className="hover:bg-secondary/50"
        >
          <Palette className="w-4 h-4 mr-2" />
          <span className="mr-2">{currentThemeData.preview}</span>
          Chat Theme
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Choose Chat Theme</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {chatThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              className={`relative p-4 rounded-xl border-2 transition-all hover:scale-105 ${
                currentTheme === theme.id
                  ? 'border-primary shadow-glow-primary'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className={`w-full h-20 rounded-lg mb-3 ${theme.background}`}></div>
              <div className="text-center">
                <div className="text-2xl mb-1">{theme.preview}</div>
                <div className="text-sm font-medium">{theme.name}</div>
              </div>
              {currentTheme === theme.id && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                  <Check className="w-3 h-3" />
                </div>
              )}
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export { chatThemes };