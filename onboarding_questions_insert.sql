-- Insert Onboarding Questions from OnboardingFlow.tsx
-- Run this script in your Supabase SQL Editor to populate the questions table

-- First, clear any existing sample questions if you want to replace them
-- DELETE FROM public.questions WHERE category = 'onboarding';

-- Insert the 5 onboarding questions from your frontend
INSERT INTO public.questions (question_text, question_type, options, category, is_required, order_index) VALUES

-- Question 1: What's your ideal weekend?
(
    'What''s your ideal weekend?',
    'multiple_choice',
    '["Adventure outdoors", "Cozy at home", "Social gatherings", "Creative projects", "Other"]'::jsonb,
    'onboarding',
    true,
    1
),

-- Question 2: What do you value most in a connection?
(
    'What do you value most in a connection?',
    'multiple_choice',
    '["Deep conversations", "Shared interests", "Emotional support", "Fun and laughter", "Other"]'::jsonb,
    'onboarding',
    true,
    2
),

-- Question 3: How do you handle conflict?
(
    'How do you handle conflict?',
    'multiple_choice',
    '["Direct discussion", "Need time to think", "Seek compromise", "Avoid confrontation", "Other"]'::jsonb,
    'onboarding',
    true,
    3
),

-- Question 4: What's your love language?
(
    'What''s your love language?',
    'multiple_choice',
    '["Words of affirmation", "Quality time", "Physical touch", "Acts of service", "Other"]'::jsonb,
    'onboarding',
    true,
    4
),

-- Question 5: Describe your communication style?
(
    'Describe your communication style?',
    'multiple_choice',
    '["Very expressive", "Good listener", "Thoughtful responses", "Quick and witty", "Other"]'::jsonb,
    'onboarding',
    true,
    5
);

-- Verify the insertion
SELECT 
    question_text,
    question_type,
    options,
    category,
    order_index
FROM public.questions 
WHERE category = 'onboarding'
ORDER BY order_index;

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Successfully inserted 5 onboarding questions from OnboardingFlow.tsx';
    RAISE NOTICE 'Questions added: ideal weekend, connection values, conflict handling, love language, communication style';
END $$;
