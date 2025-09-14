import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/hooks/useNotifications';
import { User, LogOut, Menu, X, Zap, MessageCircle, History, Heart, Settings, Home, Bell } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NavigationProps {
  variant?: 'landing' | 'dashboard';
}

export const Navigation: React.FC<NavigationProps> = ({ variant = 'landing' }) => {
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleAuth = () => {
    navigate('/auth');
  };

  const handleNotifications = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/notifications');
    }
  };

  const handleSettings = () => {
    if (!user) {
      navigate('/auth');
    } else {
      navigate('/settings');
    }
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
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

  // Remove the variant check - sidebar should be available on all pages when user is logged in

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Hamburger Menu + Logo */}
            <div className="flex items-center space-x-3">
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
              <Link to="/" className="flex items-center space-x-2">
                <div className="text-2xl font-heading font-bold text-gradient">
                  SoulMate
                </div>
              </Link>
            </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors"
            >
              How It Works
            </Link>
            <Link 
              to="/products" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Our Products
            </Link>
            <Link 
              to="/safety" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Safety
            </Link>
            <Link 
              to="/support" 
              className="text-foreground hover:text-primary transition-colors"
            >
              Support
            </Link>
          </div>

          {/* Notifications, Settings, Theme Toggle and User Menu */}
          <div className="flex items-center space-x-3">
            {/* Notifications Button - Always visible */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleNotifications}
              className="relative hover:bg-secondary/50"
              title={user ? "Notifications" : "Login to view notifications"}
            >
              <Bell className="w-4 h-4" />
              {user && unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs min-w-5 h-5 border-2 border-background">
                  {unreadCount}
                </Badge>
              )}
            </Button>

            {/* Settings Button - Always visible */}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleSettings}
              className="hover:bg-secondary/50"
              title={user ? "Settings" : "Login to access settings"}
            >
              <Settings className="w-4 h-4" />
            </Button>

            <ThemeToggle />
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-secondary/50">
                    <User className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <User className="w-4 h-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/profile/edit')}>
                    <User className="w-4 h-4 mr-2" />
                    Edit Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/match-history')}>
                    <User className="w-4 h-4 mr-2" />
                    Match History
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button 
                onClick={handleAuth}
                className="btn-mystical"
              >
                Login / Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>

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