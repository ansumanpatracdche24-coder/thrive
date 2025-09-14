import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Heart, Shield, Users, Sparkles, Eye, MessageCircle, Star } from 'lucide-react';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-mystical">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-mystical-entrance">
            Our <span className="text-gradient">Philosophy</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At SoulMate, we believe that true connections are built on more than appearances. 
            We've created a space where personalities shine first, and authentic relationships flourish.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                In a world obsessed with surface-level attraction, SoulMate dares to be different. 
                We foster connections based on personality, values, and genuine compatibility.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Our anonymous-first approach removes the bias of physical appearance, allowing 
                users to form deeper, more meaningful connections before revealing their identities.
              </p>
              <Button 
                onClick={() => navigate('/')} 
                className="btn-mystical"
              >
                Join Our Mission ✨
              </Button>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-8">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Authentic Connections</h4>
                    <p className="text-muted-foreground">
                      We prioritize genuine compatibility over superficial attraction
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Safe & Secure</h4>
                    <p className="text-muted-foreground">
                      Your privacy and safety are our top priorities
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">Magical Experience</h4>
                    <p className="text-muted-foreground">
                      Every interaction is designed to feel special and meaningful
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A detailed breakdown of our anonymous matching and reveal process
            </p>
          </div>
          
          <div className="space-y-12">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="bg-mystical-card rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">1. Create Your Anonymous Profile</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Sign up with Google and complete our mystical personality questionnaire. 
                  Your photos and personal details are kept private until you choose to reveal them.
                </p>
              </div>
              <div className="order-first lg:order-last">
                <div className="w-64 h-64 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                  <Users className="w-32 h-32 text-primary opacity-30" />
                </div>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="w-64 h-64 mx-auto bg-gradient-secondary rounded-full flex items-center justify-center">
                <MessageCircle className="w-32 h-32 text-accent opacity-30" />
              </div>
              <div className="bg-mystical-card rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                    <MessageCircle className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">2. Connect & Chat Anonymously</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Our algorithm matches you based on personality compatibility. 
                  Chat with up to 5 people simultaneously using mystical avatars and first names only.
                </p>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="bg-mystical-card rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Eye className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">3. Mutual Reveal</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  When both people feel a connection, either can request to reveal identities. 
                  Only when both agree do you see each other's photos and full profiles.
                </p>
              </div>
              <div className="order-first lg:order-last">
                <div className="w-64 h-64 mx-auto bg-gradient-accent rounded-full flex items-center justify-center">
                  <Eye className="w-32 h-32 text-accent-foreground opacity-30" />
                </div>
              </div>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div className="w-64 h-64 mx-auto bg-gradient-primary rounded-full flex items-center justify-center">
                <Star className="w-32 h-32 text-pink opacity-30" />
              </div>
              <div className="bg-mystical-card rounded-2xl p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">4. Take It Further</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  With identities revealed and a strong foundation built, you can now 
                  take your connection into the real world with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">
              What We Stand For
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-mystical-card rounded-2xl p-8 hover:scale-105 transition-mystical">
              <Heart className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="text-2xl font-heading font-semibold mb-4">Depth Over Surface</h3>
              <p className="text-muted-foreground">
                We believe meaningful relationships start with understanding minds and hearts, not just faces.
              </p>
            </div>
            
            <div className="text-center bg-mystical-card rounded-2xl p-8 hover:scale-105 transition-mystical">
              <Shield className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="text-2xl font-heading font-semibold mb-4">Privacy First</h3>
              <p className="text-muted-foreground">
                Your personal information is protected until you decide to share it on your own terms.
              </p>
            </div>
            
            <div className="text-center bg-mystical-card rounded-2xl p-8 hover:scale-105 transition-mystical">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-accent" />
              <h3 className="text-2xl font-heading font-semibold mb-4">Authentic Connections</h3>
              <p className="text-muted-foreground">
                We create space for genuine conversations and real compatibility to flourish naturally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Ready to Experience <span className="text-gradient">True Connection</span>?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands who have discovered that the best relationships start with the heart and mind.
          </p>
          <Button 
            onClick={() => navigate('/')} 
            className="btn-mystical text-xl px-12 py-6 animate-pulse-glow"
          >
            Begin Your Journey ✨
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;