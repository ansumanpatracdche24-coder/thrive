import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProfilePicture } from '@/components/ProfilePicture';
import { 
  ArrowLeft,
  MessageCircle,
  Eye,
  Heart,
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import profile1 from '@/assets/profiles/profile1.jpg';
import profile2 from '@/assets/profiles/profile2.jpg';
import profile3 from '@/assets/profiles/profile3.jpg';
import profile4 from '@/assets/profiles/profile4.jpg';

interface Match {
  id: string;
  name: string;
  avatar: string;
  status: 'active' | 'revealed' | 'ended';
  lastMessage?: string;
  matchDate: string;
  revealDate?: string;
  compatibility: number;
  interests: string[];
}

const MatchHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const matches: Match[] = [
    {
      id: '1',
      name: 'Luna',
      avatar: profile1,
      status: 'active',
      lastMessage: "That's such an interesting perspective!",
      matchDate: '2024-01-15',
      compatibility: 92,
      interests: ['Philosophy', 'Art', 'Music']
    },
    {
      id: '2',
      name: 'Phoenix',
      avatar: profile2,
      status: 'revealed',
      lastMessage: 'Would love to continue this conversation over coffee ☕',
      matchDate: '2024-01-10',
      revealDate: '2024-01-12',
      compatibility: 88,
      interests: ['Photography', 'Travel', 'Cooking']
    },
    {
      id: '3',
      name: 'Sage',
      avatar: profile3,
      status: 'active',
      lastMessage: 'I feel like we have so much in common',
      matchDate: '2024-01-08',
      compatibility: 85,
      interests: ['Reading', 'Hiking', 'Philosophy']
    },
    {
      id: '4',
      name: 'River',
      avatar: profile4,
      status: 'ended',
      lastMessage: 'Thanks for the great conversations!',
      matchDate: '2023-12-20',
      compatibility: 76,
      interests: ['Music', 'Movies', 'Gaming']
    },
  ];

  const filteredMatches = matches.filter(match => {
    const matchesSearch = match.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || match.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-accent text-accent-foreground">Active</Badge>;
      case 'revealed':
        return <Badge className="bg-primary text-primary-foreground">Revealed</Badge>;
      case 'ended':
        return <Badge variant="outline" className="text-muted-foreground">Ended</Badge>;
      default:
        return null;
    }
  };

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return 'text-accent';
    if (score >= 80) return 'text-primary';
    if (score >= 70) return 'text-muted-foreground';
    return 'text-muted-foreground';
  };

  return (
    <div className="min-h-screen bg-mystical">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => navigate('/dashboard')}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-heading font-bold">Match History</h1>
              <p className="text-muted-foreground">
                Your connections and conversations
              </p>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search matches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-mystical pl-10"
            />
          </div>
          
          <Button variant="outline" size="sm" className="btn-secondary-mystical">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="bg-mystical-card border border-border">
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              All ({matches.length})
            </TabsTrigger>
            <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Active ({matches.filter(m => m.status === 'active').length})
            </TabsTrigger>
            <TabsTrigger value="revealed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Revealed ({matches.filter(m => m.status === 'revealed').length})
            </TabsTrigger>
            <TabsTrigger value="ended" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Ended ({matches.filter(m => m.status === 'ended').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Matches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <div
              key={match.id}
              className="bg-mystical-card rounded-xl p-6 border border-border hover:shadow-glow-primary transition-all duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <ProfilePicture
                  src={match.avatar}
                  alt={match.name}
                  fallback={match.name[0]}
                  isRevealed={match.status === 'revealed'}
                  size="md"
                />
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{match.name}</h3>
                    {getStatusBadge(match.status)}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    <span>Matched {new Date(match.matchDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Compatibility Score */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Compatibility</span>
                  <span className={`font-semibold ${getCompatibilityColor(match.compatibility)}`}>
                    {match.compatibility}%
                  </span>
                </div>
                <div className="w-full bg-secondary/30 h-2 rounded">
                  <div 
                    className="bg-gradient-accent h-2 rounded transition-all duration-300"
                    style={{ width: `${match.compatibility}%` }}
                  ></div>
                </div>
              </div>

              {/* Shared Interests */}
              <div className="mb-4">
                <span className="text-sm text-muted-foreground mb-2 block">Shared Interests</span>
                <div className="flex flex-wrap gap-1">
                  {match.interests.slice(0, 3).map((interest) => (
                    <Badge
                      key={interest}
                      variant="outline"
                      className="text-xs border-primary/30 text-primary"
                    >
                      {interest}
                    </Badge>
                  ))}
                  {match.interests.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{match.interests.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Last Message */}
              {match.lastMessage && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground italic truncate">
                    "{match.lastMessage}"
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex space-x-2">
                <Button
                  onClick={() => navigate('/chat')}
                  variant="outline"
                  size="sm"
                  className="flex-1 btn-secondary-mystical"
                  disabled={match.status === 'ended'}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat
                </Button>
                
                {match.status === 'revealed' && (
                  <Button
                    onClick={() => navigate(`/profile/${match.id}`)}
                    size="sm"
                    className="btn-mystical"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredMatches.length === 0 && (
          <div className="text-center py-16">
            <Heart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-heading font-semibold mb-2">
              No matches found
            </h3>
            <p className="text-muted-foreground mb-6">
              {searchQuery 
                ? `No matches found for "${searchQuery}"`
                : "Start connecting to see your match history here"
              }
            </p>
            <Button onClick={() => navigate('/connect')} className="btn-mystical">
              Find Connections
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MatchHistoryPage;