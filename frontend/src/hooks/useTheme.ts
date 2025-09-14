import { useState, useEffect } from 'react';

export type Theme = 'light' | 'dark' | 'love';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('soulmate-theme');
    return (saved as Theme) || 'love';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    root.classList.remove('light', 'dark', 'love');
    
    // Apply the current theme
    root.classList.add(theme);
    
    // Update CSS variables based on theme
    if (theme === 'light') {
      // Clean light theme like mainstream apps
      root.style.setProperty('--background', '0 0% 100%');
      root.style.setProperty('--foreground', '0 0% 9%');
      root.style.setProperty('--card', '0 0% 100%');
      root.style.setProperty('--card-foreground', '0 0% 9%');
      root.style.setProperty('--popover', '0 0% 100%');
      root.style.setProperty('--popover-foreground', '0 0% 9%');
      root.style.setProperty('--primary', '221 83% 53%');
      root.style.setProperty('--primary-foreground', '0 0% 98%');
      root.style.setProperty('--primary-hover', '221 83% 45%');
      root.style.setProperty('--secondary', '210 40% 96%');
      root.style.setProperty('--secondary-foreground', '0 0% 9%');
      root.style.setProperty('--secondary-hover', '210 40% 90%');
      root.style.setProperty('--muted', '210 40% 96%');
      root.style.setProperty('--muted-foreground', '215 13% 45%');
      root.style.setProperty('--accent', '210 40% 96%');
      root.style.setProperty('--accent-foreground', '0 0% 9%');
      root.style.setProperty('--accent-hover', '210 40% 90%');
      root.style.setProperty('--border', '214 32% 91%');
      root.style.setProperty('--input', '214 32% 91%');
      root.style.setProperty('--ring', '221 83% 53%');
      
      // Light theme gradients
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(0, 0%, 100%) 0%, hsl(210, 40%, 98%) 100%)');
      root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, hsl(210, 40%, 96%) 0%, hsl(214, 32%, 91%) 100%)');
      root.style.setProperty('--gradient-accent', 'linear-gradient(135deg, hsl(221, 83%, 53%) 0%, hsl(221, 83%, 45%) 100%)');
    } else if (theme === 'dark') {
      // Professional dark theme
      root.style.setProperty('--background', '0 0% 9%');
      root.style.setProperty('--foreground', '0 0% 98%');
      root.style.setProperty('--card', '0 0% 9%');
      root.style.setProperty('--card-foreground', '0 0% 98%');
      root.style.setProperty('--popover', '0 0% 9%');
      root.style.setProperty('--popover-foreground', '0 0% 98%');
      root.style.setProperty('--primary', '0 0% 98%');
      root.style.setProperty('--primary-foreground', '0 0% 9%');
      root.style.setProperty('--primary-hover', '0 0% 90%');
      root.style.setProperty('--secondary', '0 0% 14%');
      root.style.setProperty('--secondary-foreground', '0 0% 98%');
      root.style.setProperty('--secondary-hover', '0 0% 18%');
      root.style.setProperty('--muted', '0 0% 14%');
      root.style.setProperty('--muted-foreground', '0 0% 64%');
      root.style.setProperty('--accent', '0 0% 14%');
      root.style.setProperty('--accent-foreground', '0 0% 98%');
      root.style.setProperty('--accent-hover', '0 0% 18%');
      root.style.setProperty('--border', '0 0% 14%');
      root.style.setProperty('--input', '0 0% 14%');
      root.style.setProperty('--ring', '0 0% 83%');
      
      // Dark theme gradients
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(0, 0%, 9%) 0%, hsl(0, 0%, 6%) 100%)');
      root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, hsl(0, 0%, 14%) 0%, hsl(0, 0%, 9%) 100%)');
      root.style.setProperty('--gradient-accent', 'linear-gradient(135deg, hsl(0, 0%, 18%) 0%, hsl(0, 0%, 14%) 100%)');
    } else {
      // Love mode - original mystical theme
      root.style.setProperty('--background', '284 71% 8%');
      root.style.setProperty('--foreground', '0 0% 100%');
      root.style.setProperty('--card', '284 71% 12%');
      root.style.setProperty('--card-foreground', '0 0% 100%');
      root.style.setProperty('--popover', '284 71% 12%');
      root.style.setProperty('--popover-foreground', '0 0% 100%');
      root.style.setProperty('--primary', '265 100% 88%');
      root.style.setProperty('--primary-foreground', '284 71% 8%');
      root.style.setProperty('--primary-hover', '265 80% 75%');
      root.style.setProperty('--secondary', '285 69% 18%');
      root.style.setProperty('--secondary-foreground', '0 0% 100%');
      root.style.setProperty('--secondary-hover', '285 69% 25%');
      root.style.setProperty('--muted', '285 40% 20%');
      root.style.setProperty('--muted-foreground', '265 30% 70%');
      root.style.setProperty('--accent', '330 100% 85%');
      root.style.setProperty('--accent-foreground', '284 71% 8%');
      root.style.setProperty('--accent-hover', '330 80% 70%');
      root.style.setProperty('--border', '285 40% 25%');
      root.style.setProperty('--input', '285 40% 15%');
      root.style.setProperty('--ring', '265 100% 88%');
      
      // Love theme gradients (restore original)
      root.style.setProperty('--gradient-primary', 'linear-gradient(135deg, hsl(284, 71%, 18%) 0%, hsl(285, 69%, 8%) 100%)');
      root.style.setProperty('--gradient-secondary', 'linear-gradient(135deg, hsl(290, 60%, 25%) 0%, hsl(284, 71%, 12%) 100%)');
      root.style.setProperty('--gradient-accent', 'linear-gradient(135deg, hsl(265, 100%, 88%) 0%, hsl(330, 100%, 85%) 100%)');
    }
    
    // Update body background for theme
    if (theme === 'love') {
      document.body.style.background = 'var(--gradient-primary)';
    } else if (theme === 'light') {
      document.body.style.background = 'var(--gradient-primary)';
    } else {
      document.body.style.background = 'var(--gradient-primary)';
    }
    
    localStorage.setItem('soulmate-theme', theme);
  }, [theme]);

  return { theme, setTheme };
};