import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Users, Sparkles } from 'lucide-react';
import { ParticleHeart } from '@/components/ParticleHeart';
import { ProfilePicture } from '@/components/ProfilePicture';
import { useAuth } from '@/hooks/useAuth';
import profile4 from '@/assets/profiles/profile4.jpg';
import profile5 from '@/assets/profiles/profile5.jpg';
import profile6 from '@/assets/profiles/profile6.jpg';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile, signInWithGoogle, signOut } = useAuth();

  const handleJoinWithGoogle = async () => {
    if (user) {
      navigate('/dashboard');
    } else {
      const { error } = await signInWithGoogle();
      if (!error) {
        // User will be redirected automatically
      }
    }
  };

  const handleLoginSignup = () => {
    navigate('/auth');
  };

  const getUserDisplayName = () => {
    // Prefer the saved profile name if available
    if (profile?.name) {
      return profile.name.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <div className="min-h-screen bg-mystical overflow-hidden">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-mystical-entrance">
                Discover a Connection{' '}
                <span className="text-gradient">Beyond the Surface</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-mystical-entrance" style={{ animationDelay: '0.2s' }}>
                Welcome to SoulMate, where personality comes first. Match, chat, and reveal when you're both ready.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                {user ? (
                  <div className="text-center lg:text-left">
                    <h2 className="text-3xl font-heading font-semibold text-gradient animate-mystical-entrance">
                      Hello, {getUserDisplayName()}! ✨
                    </h2>
                    <p className="text-muted-foreground mt-2">
                      Welcome back to your SoulMate journey
                    </p>
                  </div>
                ) : (
                  <Button 
                    onClick={handleLoginSignup}
                    className="btn-mystical text-xl px-12 py-6 animate-mystical-entrance animate-pulse-glow"
                    style={{ animationDelay: '0.4s' }}
                  >
                    Login / Sign Up ✨
                  </Button>
                )}
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="w-96 h-96 relative">
                <ParticleHeart className="absolute inset-0" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Your Journey Starts Here
            </h2>
            <p className="text-xl text-muted-foreground">
              Three simple steps to find your soulmate
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-mystical-card rounded-2xl p-8 transition-mystical hover:scale-105">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">1. Create Your Profile</h3>
              <p className="text-muted-foreground">
                Share your personality through our mystical questionnaire and showcase your authentic self.
              </p>
            </div>
            
            <div className="text-center bg-mystical-card rounded-2xl p-8 transition-mystical hover:scale-105">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">2. Connect Anonymously</h3>
              <p className="text-muted-foreground">
                Discover connections based on personality, not appearance. Build meaningful conversations first.
              </p>
            </div>
            
            <div className="text-center bg-mystical-card rounded-2xl p-8 transition-mystical hover:scale-105">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-2xl font-heading font-semibold mb-4">3. Reveal Your SoulMate</h3>
              <p className="text-muted-foreground">
                When you both feel the connection, mutually reveal your identities and take the next step.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Love Stories Written in the Stars
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-mystical-card rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <ProfilePicture
                  src={profile4}
                  alt="Elena"
                  fallback="E"
                  isRevealed={true}
                  size="md"
                  className="mr-4"
                />
                <div>
                  <h4 className="font-semibold">Elena & Marcus</h4>
                  <p className="text-sm text-muted-foreground">Connected 6 months ago</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "We talked for weeks before revealing. When we finally met, it felt like we already knew each other's souls. Best decision ever!"
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <ProfilePicture
                  src={profile5}
                  alt="Sarah"
                  fallback="S"
                  isRevealed={true}
                  size="md"
                  className="mr-4"
                />
                <div>
                  <h4 className="font-semibold">Sarah & James</h4>
                  <p className="text-sm text-muted-foreground">Connected 1 year ago</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "The personality-first approach changed everything. We built such a deep connection before even seeing each other."
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-8">
              <div className="flex items-center mb-4">
                <ProfilePicture
                  src={profile6}
                  alt="Alex"
                  fallback="A"
                  isRevealed={true}
                  size="md"
                  className="mr-4"
                />
                <div>
                  <h4 className="font-semibold">Alex & Jordan</h4>
                  <p className="text-sm text-muted-foreground">Connected 8 months ago</p>
                </div>
              </div>
              <p className="text-muted-foreground italic">
                "SoulMate helped us focus on what truly matters - compatibility and genuine connection. We're engaged now!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Ready to Find Your <span className="text-gradient">SoulMate</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join thousands who've found meaningful connections beyond the surface
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <div className="text-center">
                <h2 className="text-3xl font-heading font-semibold text-gradient animate-mystical-entrance">
                  Ready to continue, {getUserDisplayName()}? ✨
                </h2>
                <p className="text-muted-foreground mt-2">
                  Your SoulMate adventure awaits
                </p>
              </div>
            ) : (
              <Button 
                onClick={handleLoginSignup}
                className="btn-mystical text-xl px-12 py-6 animate-pulse-glow"
              >
                Start Your Journey ✨
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mystical-secondary py-12 px-6 border-t border-border">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-heading font-bold text-gradient mb-4">
                SoulMate
              </div>
              <p className="text-muted-foreground">
                Where authentic connections begin
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2">
                <a href="/about" className="block text-muted-foreground hover:text-primary transition-colors">About Us</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Careers</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <div className="space-y-2">
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Privacy</a>
                <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">Terms</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <Shield className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Heart className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <Sparkles className="w-6 h-6 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 SoulMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;