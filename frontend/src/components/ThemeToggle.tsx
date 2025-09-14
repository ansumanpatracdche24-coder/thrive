import React from 'react';
import { Sun, Moon, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme, Theme } from '@/hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const themes: { key: Theme; icon: React.ReactNode; label: string }[] = [
    { key: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light Mode' },
    { key: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark Mode' },
    { key: 'love', icon: <Heart className="w-4 h-4" />, label: 'Love Mode' },
  ];

  return (
    <div className="flex items-center space-x-1 p-1 bg-mystical-card rounded-lg border border-border">
      {themes.map(({ key, icon, label }) => (
        <Button
          key={key}
          variant={theme === key ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setTheme(key)}
          className={`relative ${
            theme === key 
              ? key === 'love' 
                ? 'btn-mystical' 
                : 'bg-primary text-primary-foreground'
              : 'hover:bg-secondary/50'
          }`}
          title={label}
        >
          {icon}
        </Button>
      ))}
    </div>
  );
};