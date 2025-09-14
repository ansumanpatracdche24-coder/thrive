-- Add is_searching field to profiles table for matching functionality
-- Run this in your Supabase SQL Editor

ALTER TABLE public.profiles 
ADD COLUMN is_searching BOOLEAN DEFAULT false;

-- Create index for better performance on matching queries
CREATE INDEX idx_profiles_is_searching ON public.profiles(is_searching) WHERE is_searching = true;

-- Update RLS policy to allow users to update their own is_searching status
-- (This is already covered by the existing "Users can update their own profile" policy)

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Successfully added is_searching field to profiles table';
    RAISE NOTICE 'Created performance index for matching queries';
END $$;
