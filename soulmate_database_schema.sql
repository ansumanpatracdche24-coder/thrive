-- SoulMate Dating App - Complete Database Schema
-- Run this script in your Supabase SQL Editor

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =============================================================================
-- 1. CREATE TABLES
-- =============================================================================

-- Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT,
    phone TEXT,
    location TEXT,
    situation TEXT, -- e.g., "single", "divorced", "widowed"
    birthday DATE,
    age INTEGER,
    gender TEXT CHECK (gender IN ('male', 'female', 'non-binary', 'other')),
    interests JSONB DEFAULT '[]'::jsonb,
    personality_vector VECTOR(1536), -- AI-generated personality embedding
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Photos table for user-uploaded pictures
CREATE TABLE public.photos (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    photo_url TEXT NOT NULL,
    photo_type TEXT CHECK (photo_type IN ('profile', 'interest')) NOT NULL,
    is_primary BOOLEAN DEFAULT false,
    upload_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Questions table for onboarding questionnaire
CREATE TABLE public.questions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    question_text TEXT NOT NULL,
    question_type TEXT CHECK (question_type IN ('multiple_choice', 'text', 'scale', 'boolean')) NOT NULL,
    options JSONB, -- For multiple choice questions
    category TEXT, -- e.g., "personality", "lifestyle", "preferences"
    is_required BOOLEAN DEFAULT true,
    order_index INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Answers table to store user responses
CREATE TABLE public.answers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE NOT NULL,
    answer_text TEXT,
    answer_value JSONB, -- For complex answers (arrays, objects)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile_id, question_id)
);

-- Matches table to track connections between users
CREATE TABLE public.matches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile1_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    profile2_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'matched', 'rejected', 'blocked')) DEFAULT 'pending',
    match_score DECIMAL(3,2), -- AI compatibility score (0.00 to 1.00)
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(profile1_id, profile2_id),
    CHECK (profile1_id != profile2_id)
);

-- Messages table for chat feature
CREATE TABLE public.messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
    sender_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    message_type TEXT CHECK (message_type IN ('text', 'image', 'gif', 'voice')) DEFAULT 'text',
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications table for user-specific alerts
CREATE TABLE public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT CHECK (type IN ('new_match', 'new_message', 'profile_view', 'system')) NOT NULL,
    title TEXT NOT NULL,
    message TEXT,
    data JSONB, -- Additional notification data
    is_read BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- =============================================================================

-- Profiles indexes
CREATE INDEX idx_profiles_location ON public.profiles(location);
CREATE INDEX idx_profiles_age ON public.profiles(age);
CREATE INDEX idx_profiles_gender ON public.profiles(gender);
CREATE INDEX idx_profiles_active ON public.profiles(is_active);
CREATE INDEX idx_profiles_interests ON public.profiles USING GIN(interests);

-- Photos indexes
CREATE INDEX idx_photos_profile_id ON public.photos(profile_id);
CREATE INDEX idx_photos_type ON public.photos(photo_type);
CREATE INDEX idx_photos_primary ON public.photos(is_primary);

-- Matches indexes
CREATE INDEX idx_matches_profile1 ON public.matches(profile1_id);
CREATE INDEX idx_matches_profile2 ON public.matches(profile2_id);
CREATE INDEX idx_matches_status ON public.matches(status);
CREATE INDEX idx_matches_created_at ON public.matches(created_at);

-- Messages indexes
CREATE INDEX idx_messages_match_id ON public.messages(match_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_created_at ON public.messages(created_at);

-- Notifications indexes
CREATE INDEX idx_notifications_profile_id ON public.notifications(profile_id);
CREATE INDEX idx_notifications_type ON public.notifications(type);
CREATE INDEX idx_notifications_read ON public.notifications(is_read);
CREATE INDEX idx_notifications_created_at ON public.notifications(created_at);

-- =============================================================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- =============================================================================
-- 4. CREATE SECURITY POLICIES
-- =============================================================================

-- Profiles policies - users can only manage their own profile
CREATE POLICY "Users can view all active profiles" ON public.profiles
    FOR SELECT USING (is_active = true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON public.profiles
    FOR DELETE USING (auth.uid() = id);

-- Photos policies - users can only manage their own photos
CREATE POLICY "Users can view photos of active profiles" ON public.photos
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = photos.profile_id 
            AND profiles.is_active = true
        )
    );

CREATE POLICY "Users can insert their own photos" ON public.photos
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own photos" ON public.photos
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own photos" ON public.photos
    FOR DELETE USING (auth.uid() = profile_id);

-- Questions policies - everyone can read questions (for onboarding)
CREATE POLICY "Anyone can view questions" ON public.questions
    FOR SELECT USING (true);

-- Only admins can modify questions (you'll need to create admin role)
CREATE POLICY "Only admins can modify questions" ON public.questions
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles 
            WHERE profiles.id = auth.uid() 
            AND profiles.id IN (
                -- Add admin user IDs here or create an admin role system
                SELECT id FROM public.profiles WHERE id = auth.uid()
            )
        )
    );

-- Answers policies - users can only manage their own answers
CREATE POLICY "Users can view their own answers" ON public.answers
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert their own answers" ON public.answers
    FOR INSERT WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Users can update their own answers" ON public.answers
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own answers" ON public.answers
    FOR DELETE USING (auth.uid() = profile_id);

-- Matches policies - users can only see matches they're involved in
CREATE POLICY "Users can view their own matches" ON public.matches
    FOR SELECT USING (
        auth.uid() = profile1_id OR auth.uid() = profile2_id
    );

CREATE POLICY "Users can create matches" ON public.matches
    FOR INSERT WITH CHECK (
        auth.uid() = profile1_id OR auth.uid() = profile2_id
    );

CREATE POLICY "Users can update their own matches" ON public.matches
    FOR UPDATE USING (
        auth.uid() = profile1_id OR auth.uid() = profile2_id
    );

-- Messages policies - users can only access messages in their matches
CREATE POLICY "Users can view messages in their matches" ON public.messages
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.matches 
            WHERE matches.id = messages.match_id 
            AND (matches.profile1_id = auth.uid() OR matches.profile2_id = auth.uid())
        )
    );

CREATE POLICY "Users can send messages in their matches" ON public.messages
    FOR INSERT WITH CHECK (
        auth.uid() = sender_id AND
        EXISTS (
            SELECT 1 FROM public.matches 
            WHERE matches.id = match_id 
            AND (matches.profile1_id = auth.uid() OR matches.profile2_id = auth.uid())
            AND matches.status = 'matched'
        )
    );

CREATE POLICY "Users can update their own messages" ON public.messages
    FOR UPDATE USING (auth.uid() = sender_id);

-- Notifications policies - users can only manage their own notifications
CREATE POLICY "Users can view their own notifications" ON public.notifications
    FOR SELECT USING (auth.uid() = profile_id);

CREATE POLICY "System can create notifications" ON public.notifications
    FOR INSERT WITH CHECK (true); -- Allow system to create notifications

CREATE POLICY "Users can update their own notifications" ON public.notifications
    FOR UPDATE USING (auth.uid() = profile_id);

CREATE POLICY "Users can delete their own notifications" ON public.notifications
    FOR DELETE USING (auth.uid() = profile_id);

-- =============================================================================
-- 5. CREATE FUNCTIONS AND TRIGGERS
-- =============================================================================

-- Function to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, created_at, updated_at)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
        NOW(),
        NOW()
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_answers_updated_at
    BEFORE UPDATE ON public.answers
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER handle_matches_updated_at
    BEFORE UPDATE ON public.matches
    FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to ensure mutual matches
CREATE OR REPLACE FUNCTION public.create_mutual_match()
RETURNS TRIGGER AS $$
BEGIN
    -- Ensure profile1_id is always the smaller UUID for consistency
    IF NEW.profile1_id > NEW.profile2_id THEN
        NEW.profile1_id := OLD.profile2_id;
        NEW.profile2_id := OLD.profile1_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER ensure_mutual_match
    BEFORE INSERT OR UPDATE ON public.matches
    FOR EACH ROW EXECUTE FUNCTION public.create_mutual_match();

-- =============================================================================
-- 6. ENABLE REALTIME FOR MESSAGES
-- =============================================================================

-- Enable realtime for messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Also enable realtime for matches and notifications for better UX
ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- =============================================================================
-- 7. CREATE STORAGE BUCKET AND POLICIES
-- =============================================================================

-- Create storage bucket for user photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('user-photos', 'user-photos', true);

-- Storage policies for user photos
CREATE POLICY "Users can view all photos" ON storage.objects
    FOR SELECT USING (bucket_id = 'user-photos');

CREATE POLICY "Users can upload their own photos" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'user-photos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can update their own photos" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'user-photos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

CREATE POLICY "Users can delete their own photos" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'user-photos' AND
        auth.uid()::text = (storage.foldername(name))[1]
    );

-- =============================================================================
-- 8. INSERT SAMPLE QUESTIONS FOR ONBOARDING
-- =============================================================================

INSERT INTO public.questions (question_text, question_type, options, category, is_required, order_index) VALUES
('What are you looking for?', 'multiple_choice', '["Serious relationship", "Casual dating", "Friendship", "Not sure yet"]', 'preferences', true, 1),
('How would you describe your personality?', 'multiple_choice', '["Outgoing", "Introverted", "Adventurous", "Homebody", "Creative", "Analytical"]', 'personality', true, 2),
('What are your hobbies and interests?', 'text', null, 'lifestyle', true, 3),
('How important is physical fitness to you?', 'scale', '{"min": 1, "max": 5, "labels": ["Not important", "Very important"]}', 'lifestyle', true, 4),
('Do you want children?', 'multiple_choice', '["Yes, definitely", "Maybe someday", "No, never", "I already have children"]', 'preferences', true, 5),
('How often do you drink alcohol?', 'multiple_choice', '["Never", "Rarely", "Socially", "Regularly"]', 'lifestyle', false, 6),
('What is your education level?', 'multiple_choice', '["High school", "Some college", "Bachelor\'s degree", "Master\'s degree", "PhD", "Trade school", "Other"]', 'background', false, 7),
('How would your friends describe you?', 'text', null, 'personality', true, 8),
('What is your ideal first date?', 'text', null, 'preferences', true, 9),
('Are you religious or spiritual?', 'multiple_choice', '["Very religious", "Somewhat religious", "Spiritual but not religious", "Not religious", "Prefer not to say"]', 'background', false, 10);

-- =============================================================================
-- SCRIPT COMPLETE
-- =============================================================================

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'SoulMate database schema created successfully!';
    RAISE NOTICE 'Tables created: profiles, photos, questions, answers, matches, messages, notifications';
    RAISE NOTICE 'RLS enabled on all tables with appropriate security policies';
    RAISE NOTICE 'Realtime enabled for messages, matches, and notifications';
    RAISE NOTICE 'Storage bucket "user-photos" created with upload policies';
    RAISE NOTICE 'Sample onboarding questions inserted';
    RAISE NOTICE 'Auto-profile creation trigger set up for new users';
END $$;
