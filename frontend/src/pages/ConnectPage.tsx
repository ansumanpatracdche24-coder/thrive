import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowLeft, Heart } from 'lucide-react';

const ConnectPage: React.FC = () => {
  const navigate = useNavigate();
  const [isConnecting, setIsConnecting] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const handleConnect = () => {
    setIsConnecting(true);
    
    // 5-second loading animation
    setTimeout(() => {
      setIsConnecting(false);
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-mystical relative overflow-hidden">
      {/* Back Button */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          onClick={() => navigate('/dashboard')}
          variant="outline"
          className="btn-secondary-mystical"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-6">
        {!isConnecting && !showNotification && (
          <div className="text-center animate-mystical-entrance">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto bg-gradient-accent rounded-full flex items-center justify-center animate-pulse-glow">
                <Sparkles className="w-16 h-16 text-accent-foreground" />
              </div>
              <div className="absolute inset-0 w-32 h-32 mx-auto border-2 border-primary rounded-full animate-ping opacity-20"></div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
              Ready to Connect?
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-md mx-auto">
              Let the universe guide you to someone special. Click below to discover your next meaningful connection.
            </p>
            
            <Button 
              onClick={handleConnect}
              className="btn-mystical text-2xl px-16 py-8 animate-float"
              size="lg"
            >
              <Heart className="w-8 h-8 mr-4" />
              Find a Connection
            </Button>
            
            <p className="text-sm text-muted-foreground mt-8">
              ✨ The stars are aligning for you ✨
            </p>
          </div>
        )}

        {isConnecting && (
          <div className="text-center animate-mystical-entrance">
            <div className="relative mb-8">
              {/* Swirling energy animation */}
              <div className="w-48 h-48 mx-auto relative">
                <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                <div className="absolute inset-4 rounded-full border-4 border-accent border-r-transparent animate-spin" style={{ animationDirection: 'reverse' }}></div>
                <div className="absolute inset-8 rounded-full border-4 border-pink border-b-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Sparkles className="w-16 h-16 text-primary animate-pulse" />
                </div>
              </div>
            </div>
            
            <h2 className="text-4xl font-heading font-bold mb-6 text-gradient">
              Searching the Universe...
            </h2>
            
            <div className="space-y-3 text-lg text-muted-foreground">
              <p className="animate-pulse">🔮 Reading cosmic energy...</p>
              <p className="animate-pulse" style={{ animationDelay: '1s' }}>💫 Analyzing soul compatibility...</p>
              <p className="animate-pulse" style={{ animationDelay: '2s' }}>✨ Finding your perfect match...</p>
            </div>
            
            <div className="mt-12">
              <div className="w-64 h-2 bg-secondary rounded-full mx-auto overflow-hidden">
                <div className="h-full bg-gradient-accent rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed bottom-6 right-6 bg-mystical-card border border-primary rounded-2xl p-6 shadow-mystical animate-mystical-entrance max-w-sm z-50">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
              <Heart className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <h4 className="font-semibold text-lg mb-1">
                Connection Found! ✨
              </h4>
              <p className="text-muted-foreground text-sm mb-3">
                A new connection has been found! Start chatting to discover more about each other.
              </p>
              <Button 
                onClick={() => navigate('/chat')}
                size="sm"
                className="btn-mystical"
              >
                Start Chatting
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mystical Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-4 h-4 bg-primary rounded-full animate-float opacity-20"></div>
        <div className="absolute top-40 right-32 w-6 h-6 bg-accent rounded-full animate-float opacity-15" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-8 h-8 bg-pink rounded-full animate-float opacity-10" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-primary rounded-full animate-float opacity-25" style={{ animationDelay: '1s' }}></div>
      </div>
    </div>
  );
};

export default ConnectPage;