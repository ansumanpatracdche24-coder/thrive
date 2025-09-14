import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Heart, MapPin, Calendar, ArrowLeft } from 'lucide-react';

const ProfileSetupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    age: '',
    gender: '',
    location: '',
    situation: ''
  });
  const [loading, setLoading] = useState(false);
  const { updateProfile, user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get the previous page from state or default to dashboard
  const previousPage = location.state?.from || '/dashboard';

  // Preload existing profile data when available
  useEffect(() => {
    // Try to refresh the latest profile from DB
    refreshProfile?.();
  // We intentionally run this only on mount for a quick refresh
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        bio: profile.bio || '',
        age: profile.age ? String(profile.age) : '',
        gender: profile.gender || '',
        location: profile.location || '',
        situation: profile.situation || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.age || !formData.gender) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields (Name, Age, Gender)",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    const profileData = {
      name: formData.name,
      bio: formData.bio || null,
      age: parseInt(formData.age),
      gender: formData.gender,
      location: formData.location || null,
      situation: formData.situation || null,
      is_active: true,
      is_verified: false
    };

    const { error } = await updateProfile(profileData);

    if (error) {
      toast({
        title: "Profile Setup Failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Profile Created!",
        description: "Welcome to SoulMate! Your profile has been set up successfully."
      });
      navigate(previousPage);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-mystical flex items-center justify-center px-6">
      <div className="w-full max-w-2xl">
        <div className="flex items-center mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(previousPage)}
            className="mr-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="flex-1 text-center">
            <h1 className="text-4xl font-heading font-bold text-gradient mb-4">
              Complete Your Profile
            </h1>
            <p className="text-muted-foreground">
              Tell us about yourself to get started on your SoulMate journey
            </p>
          </div>
        </div>

        <Card className="bg-mystical-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <User className="w-6 h-6" />
              Profile Information
            </CardTitle>
            <CardDescription>
              This information will help us find your perfect matches
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name *
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="input-mystical"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Bio
                </Label>
                <Textarea
                  id="bio"
                  placeholder="Tell us about yourself, your interests, and what you're looking for..."
                  value={formData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  className="input-mystical min-h-[100px] resize-none"
                  rows={4}
                />
              </div>

              {/* Age and Gender Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Age *
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    min="18"
                    max="100"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="input-mystical"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                    <SelectTrigger className="input-mystical">
                      <SelectValue placeholder="Select your gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="non-binary">Non-binary</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="City, Country"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="input-mystical"
                />
              </div>

              {/* Relationship Status */}
              <div className="space-y-2">
                <Label htmlFor="situation">Relationship Status</Label>
                <Select value={formData.situation} onValueChange={(value) => handleInputChange('situation', value)}>
                  <SelectTrigger className="input-mystical">
                    <SelectValue placeholder="Select your relationship status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                    <SelectItem value="separated">Separated</SelectItem>
                    <SelectItem value="complicated">It's complicated</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full btn-mystical text-lg py-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Setting up your profile...
                  </>
                ) : (
                  'Complete Profile Setup'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
