import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate } from 'react-router-dom';
import { Camera, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';

interface ProfileData {
  photo?: File;
  bio: string;
  phone: string;
  location: string;
  situation: string;
  interests: File[];
  questionnaire: Record<number, string>;
}

const OnboardingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showWelcome, setShowWelcome] = useState(true);
  const [profileData, setProfileData] = useState<ProfileData>({
    bio: '',
    phone: '',
    location: '',
    situation: '',
    interests: [],
    questionnaire: {}
  });

  const questions = [
    {
      question: "What's your ideal weekend?",
      options: ["Adventure outdoors", "Cozy at home", "Social gatherings", "Creative projects", "Other"]
    },
    {
      question: "What do you value most in a connection?",
      options: ["Deep conversations", "Shared interests", "Emotional support", "Fun and laughter", "Other"]
    },
    {
      question: "How do you handle conflict?",
      options: ["Direct discussion", "Need time to think", "Seek compromise", "Avoid confrontation", "Other"]
    },
    {
      question: "What's your love language?",
      options: ["Words of affirmation", "Quality time", "Physical touch", "Acts of service", "Other"]
    },
    {
      question: "Describe your communication style?",
      options: ["Very expressive", "Good listener", "Thoughtful responses", "Quick and witty", "Other"]
    }
  ];

  const handleWelcomeChoice = (setupProfile: boolean) => {
    setShowWelcome(false);
    if (!setupProfile) {
      navigate('/dashboard');
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleQuestionAnswer = (questionIndex: number, answer: string) => {
    setProfileData(prev => ({
      ...prev,
      questionnaire: { ...prev.questionnaire, [questionIndex]: answer }
    }));
  };

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-mystical flex items-center justify-center p-6">
        <div className="bg-mystical-card rounded-2xl p-8 max-w-md w-full text-center animate-mystical-entrance">
          <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-8 h-8 text-accent-foreground" />
          </div>
          <h2 className="text-3xl font-heading font-bold mb-4">
            Welcome to SoulMate!
          </h2>
          <p className="text-muted-foreground mb-8">
            Let's set up your profile to find your first connection.
          </p>
          <div className="space-y-4">
            <Button 
              onClick={() => handleWelcomeChoice(true)}
              className="btn-mystical w-full"
            >
              Set Up Profile ✨
            </Button>
            <Button 
              onClick={() => handleWelcomeChoice(false)}
              variant="secondary"
              className="btn-secondary-mystical w-full"
            >
              Skip for Now
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-mystical p-6">
      <div className="container mx-auto max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8 pt-8">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Step {step + 1} of 5</span>
            <span>{Math.round(((step + 1) / 5) * 100)}% complete</span>
          </div>
          <div className="w-full bg-secondary rounded-full h-2">
            <div 
              className="bg-gradient-accent h-2 rounded-full transition-all duration-500"
              style={{ width: `${((step + 1) / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-mystical-card rounded-2xl p-8 animate-mystical-entrance">
          {/* Step 0: Profile Picture */}
          {step === 0 && (
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Add Your Profile Picture
              </h2>
              <p className="text-muted-foreground mb-8">
                Please upload a clear photo of your face. This will only be shown to others after you both agree to reveal.
              </p>
              
              <div className="w-48 h-48 mx-auto mb-6 border-2 border-dashed border-border rounded-2xl flex items-center justify-center hover:border-primary transition-colors cursor-pointer bg-secondary/20">
                <div className="text-center">
                  <Camera className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload</p>
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground mb-8">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          )}

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div>
              <h2 className="text-3xl font-heading font-bold mb-6 text-center">
                Tell Us About Yourself
              </h2>
              
              <div className="space-y-6">
                <div>
                  <Label htmlFor="bio" className="text-lg font-medium">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Share what makes you unique..."
                    className="input-mystical mt-2 min-h-32"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {profileData.bio.length}/500 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="phone" className="text-lg font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className="input-mystical mt-2"
                    value={profileData.phone}
                    onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>

                <div>
                  <Label htmlFor="location" className="text-lg font-medium">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    className="input-mystical mt-2"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>

                <div>
                  <Label className="text-lg font-medium">Current Situation</Label>
                  <Select value={profileData.situation} onValueChange={(value) => setProfileData(prev => ({ ...prev, situation: value }))}>
                    <SelectTrigger className="input-mystical mt-2">
                      <SelectValue placeholder="Select your current situation" />
                    </SelectTrigger>
                    <SelectContent className="bg-mystical-card border border-border">
                      <SelectItem value="working">Working Professional</SelectItem>
                      <SelectItem value="college">In College</SelectItem>
                      <SelectItem value="figuring-out">Figuring it out</SelectItem>
                      <SelectItem value="student">Graduate Student</SelectItem>
                      <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Interest Gallery */}
          {step === 2 && (
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Show Your World
              </h2>
              <p className="text-muted-foreground mb-8">
                Upload up to 5 photos showcasing your hobbies, passions, or life moments.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="aspect-square border-2 border-dashed border-border rounded-2xl flex items-center justify-center hover:border-primary transition-colors cursor-pointer bg-secondary/20">
                    <div className="text-center">
                      <Camera className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Photo {i + 1}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground">
                Travel photos, pets, cooking, hobbies - anything that represents you!
              </p>
            </div>
          )}

          {/* Steps 3-4: Mystical Questionnaire */}
          {(step === 3 || step === 4) && (
            <div className="text-center">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Mystical Questionnaire
              </h2>
              <p className="text-muted-foreground mb-8">
                Help us understand your personality and preferences
              </p>
              
              <div className="space-y-8">
                {questions.slice((step - 3) * 3, (step - 2) * 3).map((q, qIndex) => {
                  const actualIndex = (step - 3) * 3 + qIndex;
                  return (
                    <div key={actualIndex} className="text-left">
                      <h3 className="text-xl font-semibold mb-4">{q.question}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {q.options.map((option, optIndex) => {
                          const isSelected = profileData.questionnaire[actualIndex] === option;
                          const isOther = option === "Other";
                          return (
                            <div key={optIndex}>
                              <button
                                onClick={() => handleQuestionAnswer(actualIndex, option)}
                                className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                                  isSelected
                                    ? 'border-primary bg-primary/10 text-primary scale-105'
                                    : 'border-border hover:border-primary/50 hover:bg-secondary/30'
                                }`}
                              >
                                {option}
                              </button>
                              {isOther && isSelected && (
                                <Input
                                  placeholder="Please specify..."
                                  className="input-mystical mt-2"
                                  onChange={(e) => handleQuestionAnswer(actualIndex, `Other: ${e.target.value}`)}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-border">
            <Button
              onClick={handleBack}
              variant="secondary"
              className="btn-secondary-mystical"
              disabled={step === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            <Button
              onClick={handleNext}
              className="btn-mystical"
            >
              {step === 4 ? 'Complete Setup' : 'Continue'}
              {step !== 4 && <ChevronRight className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;