import React from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Eye, 
  AlertTriangle, 
  Lock, 
  UserCheck, 
  MessageCircle, 
  Phone,
  Heart,
  CheckCircle
} from 'lucide-react';

const SafetyPage: React.FC = () => {
  const navigate = useNavigate();

  const safetyTips = [
    {
      icon: Eye,
      title: "Take Your Time Before Revealing",
      description: "Get to know someone through conversations before agreeing to reveal identities. Trust your instincts."
    },
    {
      icon: MessageCircle,
      title: "Keep Conversations on Platform",
      description: "Continue chatting on SoulMate until you're ready to meet. Avoid sharing personal contact information too early."
    },
    {
      icon: UserCheck,
      title: "Meet in Public Places",
      description: "When you decide to meet in person, always choose a public location for your first few dates."
    },
    {
      icon: Phone,
      title: "Tell Someone Your Plans",
      description: "Let a friend or family member know when and where you're meeting someone new."
    },
    {
      icon: AlertTriangle,
      title: "Report Suspicious Behavior",
      description: "If someone makes you uncomfortable or asks for money/personal information, report them immediately."
    },
    {
      icon: Lock,
      title: "Protect Your Privacy",
      description: "Never share financial information, home address, or other sensitive personal details."
    }
  ];

  const reportingSteps = [
    "Tap the report button in the chat or on their profile",
    "Select the reason for your report",
    "Provide additional details if necessary",
    "Our safety team will review within 24 hours",
    "We'll take appropriate action to keep you safe"
  ];

  return (
    <div className="min-h-screen bg-mystical">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <Shield className="w-20 h-20 mx-auto mb-6 text-accent animate-pulse-glow" />
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-mystical-entrance">
            Your Safety is Our <span className="text-gradient">Priority</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            At SoulMate, we've built comprehensive safety features and guidelines to ensure 
            your dating experience is both magical and secure.
          </p>
        </div>
      </section>

      {/* Safety Features */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Built-in Safety Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform includes multiple layers of protection to keep you safe
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Anonymous by Default
              </h3>
              <p className="text-muted-foreground">
                Your photos and personal details remain private until you both agree to reveal them, giving you full control.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                24/7 Monitoring
              </h3>
              <p className="text-muted-foreground">
                Our AI-powered safety systems monitor for inappropriate content and behavior around the clock.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Easy Reporting
              </h3>
              <p className="text-muted-foreground">
                Report inappropriate behavior with one tap. Our safety team investigates all reports within 24 hours.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Lock className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Secure Data Protection
              </h3>
              <p className="text-muted-foreground">
                All your data is encrypted and stored securely. We never share your information with third parties.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <UserCheck className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Profile Verification
              </h3>
              <p className="text-muted-foreground">
                All profiles go through our verification process to ensure authentic users and reduce fake accounts.
              </p>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 hover:scale-105 transition-mystical">
              <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-heading font-semibold mb-3">
                Mutual Consent
              </h3>
              <p className="text-muted-foreground">
                Every step of connection requires mutual agreement, from matching to revealing identities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Essential Safety Tips
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow these guidelines to ensure a safe and positive dating experience
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {safetyTips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="bg-mystical-card rounded-2xl p-6 flex space-x-4">
                  <div className="w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-heading font-semibold mb-3">
                      {tip.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {tip.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Reporting Process */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-heading font-bold mb-6">
                How to Report Issues
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                If you encounter any inappropriate behavior or feel unsafe, our reporting system 
                makes it easy to get help quickly and discreetly.
              </p>
              
              <div className="space-y-4">
                {reportingSteps.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center flex-shrink-0 text-accent-foreground font-semibold">
                      {index + 1}
                    </div>
                    <p className="text-muted-foreground pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-8">
              <div className="text-center mb-6">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-heading font-semibold mb-2">
                  Need Help Now?
                </h3>
                <p className="text-muted-foreground">
                  Our safety team is here to help 24/7
                </p>
              </div>
              
              <div className="space-y-4">
                <Button className="btn-mystical w-full">
                  Report an Issue
                </Button>
                <Button variant="outline" className="btn-secondary-mystical w-full">
                  Contact Safety Team
                </Button>
                <Button variant="outline" className="btn-secondary-mystical w-full">
                  Emergency Resources
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground text-center mt-6">
                In case of immediate danger, please contact local emergency services
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Community Guidelines
            </h2>
            <p className="text-xl text-muted-foreground">
              Help us maintain a respectful and welcoming environment for everyone
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-semibold flex items-center">
                <CheckCircle className="w-6 h-6 text-accent mr-3" />
                Do's
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Be respectful and kind in all interactions
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Use recent, authentic photos of yourself
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Respect others' boundaries and consent
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Report inappropriate behavior
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Take time to build trust before revealing
                </li>
              </ul>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-heading font-semibold flex items-center">
                <AlertTriangle className="w-6 h-6 text-destructive mr-3" />
                Don'ts
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Share inappropriate or explicit content
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Ask for money or financial information
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Use fake photos or misrepresent yourself
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Harass or pressure other users
                </li>
                <li className="flex items-start">
                  <span className="text-destructive mr-2">•</span>
                  Share others' private information
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-6">
            Start Your Safe Dating Journey
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join SoulMate knowing that your safety and privacy are protected every step of the way.
          </p>
          <Button 
            onClick={() => navigate('/')}
            className="btn-mystical text-xl px-12 py-6 animate-pulse-glow"
          >
            <Shield className="w-6 h-6 mr-3" />
            Join Safely Today ✨
          </Button>
        </div>
      </section>
    </div>
  );
};

export default SafetyPage;