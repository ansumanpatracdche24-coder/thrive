import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { 
  Check, 
  Star, 
  Zap, 
  MessageCircle, 
  Eye, 
  Heart, 
  Sparkles, 
  Crown,
  Infinity
} from 'lucide-react';

const ProductsPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { name: 'Anonymous matching', free: true, premium: true },
    { name: 'Up to 5 concurrent chats', free: true, premium: false },
    { name: 'Unlimited concurrent chats', free: false, premium: true },
    { name: 'Basic personality insights', free: true, premium: true },
    { name: 'Advanced compatibility analysis', free: false, premium: true },
    { name: 'See who upvoted you', free: false, premium: true },
    { name: 'Priority matching', free: false, premium: true },
    { name: 'Read receipts', free: true, premium: true },
    { name: 'Voice messages', free: false, premium: true },
    { name: 'Photo sharing in chat', free: false, premium: true },
    { name: 'Mystical relationship guidance', free: false, premium: true },
    { name: 'Profile boost (2x visibility)', free: false, premium: true },
  ];

  return (
    <div className="min-h-screen bg-mystical">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-mystical-entrance">
            Unlock Your <span className="text-gradient">Full Potential</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Enhance your SoulMate experience with premium features designed to help you 
            find deeper connections faster.
          </p>
          <div className="flex items-center justify-center space-x-2 text-accent">
            <Sparkles className="w-5 h-5" />
            <span className="text-lg">Special launch offer: 50% off first month</span>
            <Sparkles className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-mystical-card rounded-2xl p-8 border border-border hover:border-primary/50 transition-colors">
              <div className="text-center mb-8">
                <Heart className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h2 className="text-3xl font-heading font-bold mb-2">SoulMate Free</h2>
                <p className="text-muted-foreground mb-6">
                  Perfect for exploring connections
                </p>
                <div className="text-4xl font-bold">
                  <span className="text-6xl">$0</span>
                  <span className="text-xl text-muted-foreground">/month</span>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {feature.free ? (
                      <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    ) : (
                      <div className="w-5 h-5 flex-shrink-0" />
                    )}
                    <span className={feature.free ? '' : 'text-muted-foreground line-through'}>
                      {feature.name}
                    </span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => navigate('/')}
                variant="outline" 
                className="btn-secondary-mystical w-full"
              >
                Get Started Free
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-mystical-card rounded-2xl p-8 border-2 border-accent relative overflow-hidden hover:border-accent-hover transition-colors">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-accent text-accent-foreground border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
              
              <div className="text-center mb-8">
                <div className="relative">
                  <Star className="w-16 h-16 mx-auto mb-4 text-accent animate-pulse-glow" />
                  <div className="absolute inset-0 w-16 h-16 mx-auto animate-ping opacity-20">
                    <Star className="w-16 h-16 text-accent" />
                  </div>
                </div>
                <h2 className="text-3xl font-heading font-bold mb-2 text-gradient">
                  SoulMate Premium
                </h2>
                <p className="text-muted-foreground mb-6">
                  Unlock unlimited connections
                </p>
                <div className="text-4xl font-bold">
                  <span className="line-through text-2xl text-muted-foreground mr-2">$29.99</span>
                  <span className="text-6xl text-gradient">$14.99</span>
                  <span className="text-xl text-muted-foreground">/month</span>
                </div>
                <p className="text-sm text-accent mt-2">50% off for first month!</p>
              </div>
              
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="font-medium">{feature.name}</span>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={() => navigate('/')}
                className="btn-mystical w-full text-lg py-4 animate-pulse-glow"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Upgrade to Premium
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Features Detail */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Premium Features in Detail
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what makes SoulMate Premium the ultimate dating experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Infinity className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Unlimited Chats
              </h3>
              <p className="text-muted-foreground">
                Connect with as many people as you want. No more 5-chat limit - explore all your potential matches.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Priority Matching
              </h3>
              <p className="text-muted-foreground">
                Get matched faster with our priority algorithm that puts you at the front of the line.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                See Who Upvoted You
              </h3>
              <p className="text-muted-foreground">
                Discover who's interested in connecting with you before you even start chatting.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Advanced Compatibility
              </h3>
              <p className="text-muted-foreground">
                Get deeper insights into your compatibility with detailed personality analysis and match scores.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Rich Messaging
              </h3>
              <p className="text-muted-foreground">
                Share voice messages, photos, and express yourself fully with premium chat features.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Crown className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Profile Boost
              </h3>
              <p className="text-muted-foreground">
                Get 2x more visibility with profile boosts that help you stand out to potential matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Frequently Asked Questions
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-mystical-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Can I cancel my premium subscription anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes, you can cancel your premium subscription at any time from your account settings. 
                You'll continue to have premium access until the end of your current billing period.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                What happens to my conversations if I downgrade?
              </h3>
              <p className="text-muted-foreground">
                If you have more than 5 active chats when you downgrade, you'll need to choose 
                which 5 to keep active. Your chat history will be preserved for when you upgrade again.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Is the 50% discount recurring?
              </h3>
              <p className="text-muted-foreground">
                The 50% discount applies only to your first month. After that, you'll be charged 
                the regular premium rate of $29.99/month unless you cancel.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-3">
                Do premium features work with the anonymous system?
              </h3>
              <p className="text-muted-foreground">
                Absolutely! All premium features are designed to work seamlessly with our anonymous 
                matching system. Your identity remains protected until you choose to reveal it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Find Your <span className="text-gradient">Perfect Match</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join premium today and unlock unlimited possibilities for meaningful connections.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="btn-mystical text-xl px-12 py-6 animate-pulse-glow"
          >
            <Star className="w-6 h-6 mr-3" />
            Start Premium Trial ✨
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            30-day money-back guarantee • Cancel anytime
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;