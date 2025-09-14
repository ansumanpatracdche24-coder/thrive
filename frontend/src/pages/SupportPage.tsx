import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  Clock, 
  Search,
  HelpCircle,
  User,
  Heart,
  Shield,
  Zap,
  Settings
} from 'lucide-react';

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const faqCategories = [
    {
      title: "Getting Started",
      icon: User,
      faqs: [
        {
          question: "How do I create an account?",
          answer: "Simply click 'Join with Google' on our homepage. You'll be guided through our onboarding process where you can set up your anonymous profile and complete our personality questionnaire."
        },
        {
          question: "Is SoulMate really free?",
          answer: "Yes! SoulMate offers a free plan that includes anonymous matching and up to 5 concurrent chats. We also offer premium features for users who want unlimited chats and advanced matching."
        },
        {
          question: "How does the anonymous system work?",
          answer: "Your photos and personal details remain hidden until both you and your match agree to reveal them. You chat using first names only and mystical avatars until you're ready to share more."
        }
      ]
    },
    {
      title: "Matching & Connections",
      icon: Heart,
      faqs: [
        {
          question: "How are matches determined?",
          answer: "Our algorithm analyzes your personality questionnaire responses and matches you with users who have complementary personalities and shared values. Physical appearance isn't considered in the matching process."
        },
        {
          question: "Can I match with someone again if we unmatched?",
          answer: "Currently, once you unmatch with someone, you won't see them in your potential matches again. This helps maintain boundaries and prevents unwanted contact."
        },
        {
          question: "How many people can I chat with at once?",
          answer: "Free users can chat with up to 5 people simultaneously. Premium users have unlimited concurrent chats."
        }
      ]
    },
    {
      title: "Privacy & Reveal System",
      icon: Shield,
      faqs: [
        {
          question: "When should I reveal my identity?",
          answer: "There's no rush! Take time to build a connection through conversation. Many users chat for days or weeks before revealing. Trust your instincts and only reveal when you feel comfortable."
        },
        {
          question: "What happens if only one person wants to reveal?",
          answer: "Both people must agree to reveal for identities to be shown. If only one person requests it, the other can accept or decline without any pressure or consequences."
        },
        {
          question: "Can I undo a reveal?",
          answer: "Once identities are mutually revealed, they cannot be hidden again in that conversation. This encourages thoughtful decision-making about when to reveal."
        }
      ]
    },
    {
      title: "Premium Features",
      icon: Zap,
      faqs: [
        {
          question: "What's included in SoulMate Premium?",
          answer: "Premium includes unlimited concurrent chats, advanced compatibility analysis, priority matching, the ability to see who upvoted you, voice messages, photo sharing, and profile boosts."
        },
        {
          question: "Can I try Premium for free?",
          answer: "We offer a 30-day money-back guarantee on all premium subscriptions. You can also take advantage of our launch offer for 50% off your first month."
        },
        {
          question: "How does billing work?",
          answer: "Premium is billed monthly at $29.99/month (or $14.99 for your first month with our current promotion). You can cancel anytime from your account settings."
        }
      ]
    },
    {
      title: "Technical Support",
      icon: Settings,
      faqs: [
        {
          question: "The app isn't loading properly, what should I do?",
          answer: "Try refreshing your browser or clearing your cache. If the problem persists, contact our support team with details about your browser and device."
        },
        {
          question: "I'm not receiving notifications",
          answer: "Check your browser's notification settings and ensure SoulMate has permission to send notifications. You can also check your notification preferences in your account settings."
        },
        {
          question: "How do I delete my account?",
          answer: "You can delete your account from the Settings page in your dashboard. Please note that this action cannot be undone and all your data will be permanently removed."
        }
      ]
    }
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    // Handle form submission
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-mystical">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="container mx-auto text-center">
          <HelpCircle className="w-20 h-20 mx-auto mb-6 text-accent animate-pulse-glow" />
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 animate-mystical-entrance">
            We're Here to <span className="text-gradient">Help</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            Find answers to your questions or get in touch with our support team. 
            We're committed to making your SoulMate experience magical.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-mystical pl-12 text-center"
            />
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-mystical-card rounded-2xl p-6 text-center hover:scale-105 transition-mystical">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-heading font-semibold mb-2">Live Chat</h3>
              <p className="text-muted-foreground mb-4">
                Get instant help from our support team
              </p>
              <Button className="btn-mystical w-full">
                Start Chat
              </Button>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 text-center hover:scale-105 transition-mystical">
              <Mail className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-heading font-semibold mb-2">Email Support</h3>
              <p className="text-muted-foreground mb-4">
                We'll respond within 24 hours
              </p>
              <Button variant="outline" className="btn-secondary-mystical w-full">
                Send Email
              </Button>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 text-center hover:scale-105 transition-mystical">
              <Clock className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-heading font-semibold mb-2">Response Time</h3>
              <p className="text-muted-foreground mb-4">
                Average response in 2 hours
              </p>
              <div className="text-accent font-medium">
                Available 24/7
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-muted-foreground">
              Find answers to the most common questions about SoulMate
            </p>
          </div>
          
          {filteredFAQs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div key={categoryIndex} className="mb-12">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Icon className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-semibold">{category.title}</h3>
                </div>
                
                <Accordion type="single" collapsible className="space-y-4">
                  {category.faqs.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="bg-mystical-card rounded-xl border border-border overflow-hidden"
                    >
                      <AccordionTrigger className="px-6 py-4 text-left hover:bg-secondary/30 transition-colors">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            );
          })}
          
          {searchQuery && filteredFAQs.length === 0 && (
            <div className="text-center py-16">
              <HelpCircle className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-2xl font-heading font-semibold mb-2">
                No results found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try a different search term or contact our support team directly
              </p>
              <Button className="btn-mystical">
                Contact Support
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Still Need Help?
            </h2>
            <p className="text-xl text-muted-foreground">
              Send us a message and we'll get back to you as soon as possible
            </p>
          </div>
          
          <form onSubmit={handleContactSubmit} className="bg-mystical-card rounded-2xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-lg font-medium">Name</Label>
                <Input
                  id="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Your name"
                  className="input-mystical mt-2"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-lg font-medium">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="your.email@example.com"
                  className="input-mystical mt-2"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="subject" className="text-lg font-medium">Subject</Label>
              <Input
                id="subject"
                value={contactForm.subject}
                onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                placeholder="What's this about?"
                className="input-mystical mt-2"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="message" className="text-lg font-medium">Message</Label>
              <Textarea
                id="message"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Please describe your issue or question in detail..."
                className="input-mystical mt-2 min-h-32"
                required
              />
            </div>
            
            <Button type="submit" className="btn-mystical w-full text-lg py-4">
              <Mail className="w-5 h-5 mr-2" />
              Send Message
            </Button>
            
            <p className="text-sm text-muted-foreground text-center">
              We typically respond within 2-24 hours. For urgent safety issues, 
              please use our live chat or emergency reporting features.
            </p>
          </form>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-16 px-6 bg-mystical-secondary">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-heading font-bold mb-6">
              Additional Resources
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-mystical-card rounded-2xl p-6 text-center hover:scale-105 transition-mystical">
              <Shield className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Safety Guidelines</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Learn about staying safe while dating online
              </p>
              <Button 
                onClick={() => navigate('/safety')}
                variant="outline" 
                size="sm"
                className="btn-secondary-mystical"
              >
                Learn More
              </Button>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 text-center hover:scale-105 transition-mystical">
              <Zap className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Premium Features</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discover advanced matching capabilities
              </p>
              <Button 
                onClick={() => navigate('/products')}
                variant="outline" 
                size="sm"
                className="btn-secondary-mystical"
              >
                View Plans
              </Button>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 text-center hover:scale-105 transition-mystical">
              <Heart className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Success Stories</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Read about couples who found love
              </p>
              <Button 
                onClick={() => navigate('/about')}
                variant="outline" 
                size="sm"
                className="btn-secondary-mystical"
              >
                Read Stories
              </Button>
            </div>
            
            <div className="bg-mystical-card rounded-2xl p-6 text-center hover:scale-105 transition-mystical">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="font-semibold mb-2">Community</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Connect with other SoulMate users
              </p>
              <Button 
                variant="outline" 
                size="sm"
                className="btn-secondary-mystical"
              >
                Join Community
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SupportPage;