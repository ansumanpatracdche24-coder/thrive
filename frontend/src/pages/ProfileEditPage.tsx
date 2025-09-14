import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ProfilePicture } from '@/components/ProfilePicture';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft,
  Camera,
  Upload,
  Calendar,
  User,
  Heart,
  Save,
  Plus,
  X,
  Check
} from 'lucide-react';
import profile1 from '@/assets/profiles/profile1.jpg';

interface UserProfile {
  name: string;
  bio: string;
  birthday: string;
  age: number;
  gender: string;
  interests: string[];
  photos: string[];
}

const ProfileEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, profile: userProfile, updateProfile, refreshProfile } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    bio: '',
    birthday: '',
    age: 0,
    gender: '',
    interests: [],
    photos: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle');

  // Load user's actual profile data
  useEffect(() => {
    if (userProfile) {
      let parsedInterests = [];
      try {
        // Handle interests - could be JSON string or array
        if (typeof userProfile.interests === 'string') {
          parsedInterests = JSON.parse(userProfile.interests);
        } else if (Array.isArray(userProfile.interests)) {
          parsedInterests = userProfile.interests.map(String);
        }
      } catch (error) {
        console.error('Error parsing interests:', error);
        parsedInterests = [];
      }

      setProfile({
        name: userProfile.name || '',
        bio: userProfile.bio || '',
        birthday: userProfile.birthday || '',
        age: userProfile.age || 0,
        gender: userProfile.gender || '',
        interests: parsedInterests,
        photos: [], // Photos will be handled separately when photo system is implemented
      });
    }
  }, [userProfile]);

  const [newInterest, setNewInterest] = useState('');

  const genderOptions = [
    'Woman',
    'Man', 
    'Non-binary',
    'Genderfluid',
    'Agender',
    'Other',
    'Prefer not to say'
  ];

  const calculateAge = (birthday: string) => {
    const today = new Date();
    const birth = new Date(birthday);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleBirthdayChange = (value: string) => {
    const age = calculateAge(value);
    setProfile(prev => ({ ...prev, birthday: value, age }));
  };

  const addInterest = () => {
    if (newInterest.trim() && !profile.interests.includes(newInterest.trim())) {
      setProfile(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest('');
    }
  };

  const removeInterest = (interest: string) => {
    setProfile(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  const removePhoto = (index: number) => {
    setProfile(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you would upload the file to your backend
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfile(prev => ({
          ...prev,
          photos: [result, ...prev.photos.slice(0, 4)] // Keep max 5 photos
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) {
      toast({
        title: "Authentication Error",
        description: "Please log in to save your profile.",
        variant: "destructive"
      });
      return;
    }

    // Validation
    if (!profile.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required.",
        variant: "destructive"
      });
      return;
    }

    setIsSaving(true);
    setSaveState('saving');
    try {
      console.log('Saving profile data:', profile);
      
      // Prepare profile data for saving
      const profileUpdates = {
        name: profile.name.trim(),
        bio: profile.bio.trim(),
        birthday: profile.birthday,
        age: profile.age,
        gender: profile.gender,
        interests: JSON.stringify(profile.interests), // Convert to JSON string for Supabase
      };

      console.log('Profile updates to send:', profileUpdates);

      const result = await updateProfile(profileUpdates);
      
      if (result.error) {
        console.error('Error saving profile:', result.error);
        toast({
          title: "Save Failed",
          description: result.error.message || "Failed to save profile. Please try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Profile saved successfully');
      toast({
        title: "Profile Saved!",
        description: "Your profile has been updated successfully."
      });
      // Refresh the profile context so other pages reflect the latest data
      try {
        await refreshProfile();
      } catch (_) {}
      setSaveState('saved');
      // Revert the button back to normal after a short delay
      setTimeout(() => setSaveState('idle'), 1500);
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-mystical">
      <div className="max-w-4xl mx-auto p-6">
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
            <h1 className="text-3xl font-heading font-bold">Edit Profile</h1>
          </div>
          
          <Button 
            onClick={handleSave} 
            className="btn-mystical"
            disabled={isSaving}
          >
            {saveState === 'saving' && (<>
              <Save className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>)}
            {saveState === 'saved' && (<>
              <Check className="w-4 h-4 mr-2" />
              Saved
            </>)}
            {saveState === 'idle' && (<>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </>)}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Photos */}
          <div className="space-y-6">
            <div className="bg-mystical-card rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Profile Photos</h3>
              
              <div className="grid grid-cols-2 gap-4">
                {/* Main photo */}
                <div className="col-span-2">
                  <div className="relative group">
                    {profile.photos.length > 0 ? (
                      <>
                        <ProfilePicture
                          src={profile.photos[0]}
                          alt="Main profile photo"
                          fallback="You"
                          isRevealed={true}
                          size="xl"
                          className="w-full h-48 object-cover rounded-xl"
                        />
                        <button
                          onClick={() => removePhoto(0)}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors z-20 shadow-lg"
                          title="Remove photo"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-48 bg-secondary/20 rounded-xl flex items-center justify-center border-2 border-dashed border-border">
                        <div className="text-center">
                          <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                          <p className="text-muted-foreground">Add your main photo</p>
                        </div>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/20 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <label className="cursor-pointer">
                        <Camera className="w-8 h-8 text-white" />
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
                
                {/* Additional photos */}
                {profile.photos.slice(1, 5).map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={photo}
                      alt={`Profile photo ${index + 2}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => removePhoto(index + 1)}
                      className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors z-20 shadow-lg opacity-0 group-hover:opacity-100"
                      title="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                
                {/* Add photo button */}
                {profile.photos.length < 5 && (
                  <label className="w-full h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-6 h-6 text-muted-foreground" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Interests */}
            <div className="bg-mystical-card rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Interests</h3>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.interests.map((interest) => (
                  <Badge
                    key={interest}
                    className="bg-accent/20 text-accent-foreground hover:bg-accent/30 cursor-pointer"
                    onClick={() => removeInterest(interest)}
                  >
                    {interest}
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                ))}
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Add an interest..."
                  className="input-mystical"
                  onKeyDown={(e) => e.key === 'Enter' && addInterest()}
                />
                <Button onClick={addInterest} size="sm" className="btn-mystical">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Basic Info */}
          <div className="space-y-6">
            <div className="bg-mystical-card rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Basic Information</h3>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-foreground">Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="input-mystical mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="birthday" className="text-foreground">Birthday</Label>
                  <Input
                    id="birthday"
                    type="date"
                    value={profile.birthday}
                    onChange={(e) => handleBirthdayChange(e.target.value)}
                    className="input-mystical mt-1"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Age: {profile.age} years old
                  </p>
                </div>

                <div>
                  <Label htmlFor="gender" className="text-foreground">Gender</Label>
                  <Select
                    value={profile.gender}
                    onValueChange={(value) => setProfile(prev => ({ ...prev, gender: value }))}
                  >
                    <SelectTrigger className="input-mystical mt-1">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-mystical-card border-border">
                      {genderOptions.map((option) => (
                        <SelectItem key={option} value={option} className="hover:bg-secondary/50">
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="bg-mystical-card rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">About Me</h3>
              
              <Textarea
                value={profile.bio}
                onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Tell us about yourself..."
                className="input-mystical min-h-32 resize-none"
                maxLength={500}
              />
              
              <div className="text-right text-sm text-muted-foreground mt-2">
                {profile.bio.length}/500 characters
              </div>
            </div>

            <div className="bg-mystical-card rounded-xl p-6">
              <h3 className="text-xl font-heading font-semibold mb-4">Share a Post</h3>
              <p className="text-muted-foreground mb-4">
                Create a post to showcase your personality and interests
              </p>
              
              <Button 
                onClick={() => navigate('/create-post')}
                variant="outline"
                className="btn-secondary-mystical w-full"
              >
                <Heart className="w-4 h-4 mr-2" />
                Create Your First Post
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditPage;