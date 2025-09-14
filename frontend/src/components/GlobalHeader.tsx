import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/hooks/useAuth';
import { Bell, Settings, ArrowLeft, Menu, X, User, LogOut, Home, Zap, MessageCircle, History, Heart } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface GlobalHeaderProps {
  showBackButton?: boolean;
  title?: string;
  actions?: React.ReactNode;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({ 
  showBackButton, 
  title, 
  actions 
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useNotifications();
  const { user, profile, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't show header on landing page or onboarding
  if (location.pathname === '/' || location.pathname === '/onboarding') {
    return null;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'connect', label: 'Find a New Match', icon: Zap, path: '/connect' },
    { id: 'chats', label: 'Messages', icon: MessageCircle, path: '/chat' },
    { id: 'history', label: 'Match History', icon: History, path: '/match-history' },
    { id: 'posts', label: 'Posts', icon: Heart, path: '/posts' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const getUserDisplayName = () => {
    if (profile?.name) {
      return profile.name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-mystical-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left side - Hamburger Menu + Back button or Logo */}
          <div className="flex items-center space-x-4">
            {/* Always show hamburger menu when user is logged in */}
            {user && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="hover:bg-secondary/50"
              >
                <Menu className="w-5 h-5" />
              </Button>
            )}
            
            {showBackButton ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-secondary/50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            ) : (
            <Link 
                to="/" 
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <div className="text-2xl font-heading font-bold text-gradient">
                  SoulMate
                </div>
              </Link>
            )}
            
            {title && (
              <div className="hidden md:block">
                <h1 className="text-xl font-heading font-semibold">
                  {title}
                </h1>
              </div>
            )}
          </div>

          {/* Right side - Actions and Controls */}
          <div className="flex items-center space-x-3">
            {/* Custom actions */}
            {actions}
            
            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/notifications')}
              className="relative hover:bg-secondary/50"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs min-w-5 h-5 border-2 border-background">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Settings */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigate('/profile/edit')}
              className="hover:bg-secondary/50"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>

    {/* Sidebar Overlay */}
    {sidebarOpen && (
      <div 
        className="fixed inset-0 bg-black/50 z-40" 
        onClick={closeSidebar}
      />
    )}

    {/* Sidebar */}
    <div className={`fixed top-0 left-0 h-full w-80 bg-background border-r border-border z-50 transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div className="text-xl font-heading font-bold text-gradient">
          SoulMate
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={closeSidebar}
          className="hover:bg-secondary/50"
        >
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* User Profile Section */}
      {user && (
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="font-semibold text-foreground">
                {getUserDisplayName()}
              </div>
              <div className="text-sm text-muted-foreground">
                {user.email}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Items */}
      <div className="flex-1 py-4">
        {sidebarItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                closeSidebar();
              }}
              className="w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-secondary/50 transition-colors"
            >
              <IconComponent className="w-5 h-5 text-muted-foreground" />
              <span className="text-foreground">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Logout Button */}
      <div className="p-6 border-t border-border">
        <Button
          onClick={() => {
            handleLogout();
            closeSidebar();
          }}
          variant="outline"
          className="w-full flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </Button>
      </div>
    </div>
    </>
  );
};