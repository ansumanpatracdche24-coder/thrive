import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ProfilePicture } from '@/components/ProfilePicture';
import { Badge } from '@/components/ui/badge';
import { Navigation } from '@/components/Navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useNotifications } from '@/hooks/useNotifications';
import { useAuth } from '@/hooks/useAuth';
import { 
  User, 
  MessageCircle, 
  Zap, 
  History, 
  ShoppingBag, 
  Settings,
  Bell,
  Heart,
  Sparkles
} from 'lucide-react';
import profile1 from '@/assets/profiles/profile1.jpg';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const { unreadCount } = useNotifications();
  const { user, profile, loading } = useAuth();

  // Check if user has completed profile setup
  const hasProfile = profile && profile.name && profile.age && profile.gender;

  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    } else if (!loading && user && !hasProfile) {
      navigate('/profile-setup');
    }
  }, [user, profile, loading, navigate, hasProfile]);

  const showProfileModal = () => {
    if (!hasProfile) {
      // Redirect to profile setup instead of onboarding
      navigate('/profile-setup');
    }
  };

  const handleConnect = () => {
    if (!hasProfile) {
      showProfileModal();
      return;
    }
    navigate('/connect');
  };

  const handleChat = () => {
    if (!hasProfile) {
      showProfileModal();
      return;
    }
    navigate('/chat');
  };

  const handleProducts = () => {
    navigate('/products');
  };

  const handleHistory = () => {
    navigate('/match-history');
  };

  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: User },
    { id: 'connect', label: 'Connect', icon: Zap, onClick: handleConnect },
    { id: 'chats', label: 'Chats', icon: MessageCircle, onClick: handleChat },
    { id: 'posts', label: 'Post Section', icon: Heart },
    { id: 'history', label: 'Match History', icon: History, onClick: handleHistory },
    { id: 'products', label: 'Our Products', icon: ShoppingBag, onClick: handleProducts },
  ] as Array<{
    id: string;
    label: string;
    icon: any;
    onClick?: () => void;
    badge?: number;
  }>;

  return (
    <div className="min-h-screen bg-mystical pt-20">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-mystical-card border-r border-border p-6 min-h-screen">
          {/* User Profile Header */}
          <div className="text-center mb-8">
            <ProfilePicture
              src={undefined}
              alt={profile?.name || 'Your Profile'}
              fallback={profile?.name?.charAt(0) || 'U'}
              isRevealed={true}
              size="xl"
              className="mx-auto mb-4"
            />
            <h2 className="text-xl font-heading font-semibold">
              {profile?.name || 'Welcome!'}
            </h2>
            <p className="text-muted-foreground">
              {profile?.location || 'Complete your profile to get started'}
            </p>
          </div>

          {/* Navigation */}
          <nav className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    if (item.onClick) {
                      item.onClick();
                    } else {
                      setActiveTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left ${
                    activeTab === item.id
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : 'hover:bg-secondary/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-accent text-accent-foreground">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-heading font-bold">
                Your SoulMate Journey
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover meaningful connections beyond the surface
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Only show notifications if user has actual notifications */}
              {unreadCount > 0 && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/notifications')}
                  className="relative"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs min-w-5 h-5">
                    {unreadCount}
                  </Badge>
                </Button>
              )}
              <ThemeToggle />
              <Button variant="outline" size="sm" onClick={() => navigate('/settings')}>
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'profile' && (
            <div className="max-w-4xl">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Overview */}
                <div className="bg-mystical-card rounded-2xl p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-6">
                    Profile Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Name</span>
                      <span className="text-foreground">{profile?.name || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Age</span>
                      <span className="text-foreground">{profile?.age || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Gender</span>
                      <span className="text-foreground">{profile?.gender || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Location</span>
                      <span className="text-foreground">{profile?.location || 'Not set'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Bio</span>
                      <span className="text-foreground">{profile?.bio ? 'Set' : 'Not set'}</span>
                    </div>
                  </div>
                  <Button 
                    className="btn-secondary-mystical w-full mt-6"
                    onClick={() => navigate('/profile/edit')}
                  >
                    Edit Profile
                  </Button>
                </div>

                {/* Quick Actions */}
                <div className="bg-mystical-card rounded-2xl p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-6">
                    Quick Actions
                  </h3>
                  <div className="space-y-4">
                    <Button 
                      onClick={handleConnect}
                      className="btn-mystical w-full text-left justify-start"
                    >
                      <Zap className="w-5 h-5 mr-3" />
                      Find New Connections
                    </Button>
                    <Button 
                      onClick={handleChat}
                      variant="outline"
                      className="btn-secondary-mystical w-full text-left justify-start"
                    >
                      <MessageCircle className="w-5 h-5 mr-3" />
                      View Active Chats
                    </Button>
                    <Button 
                      variant="outline"
                      className="btn-secondary-mystical w-full text-left justify-start"
                      onClick={() => navigate('/match-history')}
                    >
                      <History className="w-5 h-5 mr-3" />
                      Match History
                    </Button>
                  </div>
                </div>
              </div>

              {/* Recent Activity - Only show for users with actual activity */}
              <div className="mt-8">
                <div className="bg-mystical-card rounded-2xl p-6">
                  <h3 className="text-2xl font-heading font-semibold mb-6">
                    Recent Activity
                  </h3>
                  <div className="text-center py-8">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                    <h4 className="text-xl font-heading font-semibold mb-2">
                      No Recent Activity
                    </h4>
                    <p className="text-muted-foreground mb-6">
                      Start connecting with people to see your activity here
                    </p>
                    <Button onClick={handleConnect} className="btn-mystical">
                      Find Your First Connection
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Other tab content can be added here */}
          {activeTab === 'posts' && (
            <div className="text-center py-16">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Post Section Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Share moments and connect with your community
              </p>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-16">
              <History className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-heading font-semibold mb-2">
                No Match History Yet
              </h3>
              <p className="text-muted-foreground mb-6">
                Start connecting to see your match history here
              </p>
              <Button onClick={handleConnect} className="btn-mystical">
                Find Connections
              </Button>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-heading font-semibold mb-2">
                Premium Features
              </h3>
              <p className="text-muted-foreground mb-6">
                Upgrade to unlock advanced matching and unlimited chats
              </p>
              <Button onClick={() => navigate('/products')} className="btn-mystical">
                View Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
