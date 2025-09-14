import { supabase } from './supabaseClient';
import type { Database } from './supabaseClient';

// Types for the onboarding data
export interface OnboardingData {
  bio: string;
  phone?: string;
  location: string;
  situation: string;
  profilePhoto?: File;
  interestPhotos: File[];
  questionnaire: Record<number, string>;
}

export interface OnboardingResult {
  success: boolean;
  error?: string;
  profileId?: string;
}

// Helper function to generate unique file names
const generateFileName = (userId: string, file: File, type: 'profile' | 'interest', index?: number): string => {
  const timestamp = Date.now();
  const extension = file.name.split('.').pop();
  const suffix = type === 'profile' ? 'profile' : `interest-${index}`;
  return `${userId}/${suffix}-${timestamp}.${extension}`;
};

// Helper function to upload a single photo to Supabase Storage
const uploadPhoto = async (
  file: File, 
  fileName: string
): Promise<{ url: string | null; error: string | null }> => {
  try {
    // Upload file to storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('user-photos')
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { url: null, error: uploadError.message };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('user-photos')
      .getPublicUrl(uploadData.path);

    return { url: urlData.publicUrl, error: null };
  } catch (error) {
    console.error('Photo upload error:', error);
    return { url: null, error: error instanceof Error ? error.message : 'Unknown upload error' };
  }
};

// Helper function to save photo URLs to the photos table
const savePhotoToDatabase = async (
  profileId: string,
  photoUrl: string,
  photoType: 'profile' | 'interest',
  isPrimary: boolean = false,
  uploadOrder: number = 0
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const { error } = await supabase
      .from('photos')
      .insert({
        profile_id: profileId,
        photo_url: photoUrl,
        photo_type: photoType,
        is_primary: isPrimary,
        upload_order: uploadOrder
      });

    if (error) {
      console.error('Database photo save error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Photo database error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown database error' };
  }
};

// Helper function to get question IDs from the database
const getQuestionIds = async (): Promise<{ [key: number]: string }> => {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('id, order_index')
      .eq('category', 'onboarding')
      .order('order_index');

    if (error) {
      console.error('Error fetching questions:', error);
      return {};
    }

    // Create a mapping of order_index to question ID
    const questionMap: { [key: number]: string } = {};
    data?.forEach((question) => {
      if (question.order_index !== null) {
        questionMap[question.order_index - 1] = question.id; // Convert to 0-based index
      }
    });

    return questionMap;
  } catch (error) {
    console.error('Question fetch error:', error);
    return {};
  }
};

// Helper function to save questionnaire answers
const saveAnswers = async (
  profileId: string,
  questionnaire: Record<number, string>,
  questionIds: { [key: number]: string }
): Promise<{ success: boolean; error: string | null }> => {
  try {
    const answers = Object.entries(questionnaire).map(([questionIndex, answer]) => {
      const questionId = questionIds[parseInt(questionIndex)];
      if (!questionId) {
        console.warn(`No question ID found for index ${questionIndex}`);
        return null;
      }

      return {
        profile_id: profileId,
        question_id: questionId,
        answer_text: answer,
        answer_value: null // Could be used for structured data in the future
      };
    }).filter(Boolean); // Remove null entries

    if (answers.length === 0) {
      return { success: true, error: null }; // No answers to save
    }

    const { error } = await supabase
      .from('answers')
      .insert(answers);

    if (error) {
      console.error('Answers save error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, error: null };
  } catch (error) {
    console.error('Answers processing error:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown answers error' };
  }
};

// Main function to submit all onboarding data
export const submitOnboardingData = async (
  userId: string,
  data: OnboardingData
): Promise<OnboardingResult> => {
  try {
    console.log('Starting onboarding submission for user:', userId);

    // Step 1: Upload profile photo if provided
    let profilePhotoUrl: string | null = null;
    if (data.profilePhoto) {
      console.log('Uploading profile photo...');
      const profileFileName = generateFileName(userId, data.profilePhoto, 'profile');
      const profileUploadResult = await uploadPhoto(data.profilePhoto, profileFileName);
      
      if (profileUploadResult.error) {
        return { success: false, error: `Profile photo upload failed: ${profileUploadResult.error}` };
      }
      
      profilePhotoUrl = profileUploadResult.url;
      console.log('Profile photo uploaded successfully');
    }

    // Step 2: Upload interest photos
    const interestPhotoUrls: string[] = [];
    if (data.interestPhotos && data.interestPhotos.length > 0) {
      console.log(`Uploading ${data.interestPhotos.length} interest photos...`);
      
      for (let i = 0; i < data.interestPhotos.length; i++) {
        const photo = data.interestPhotos[i];
        const fileName = generateFileName(userId, photo, 'interest', i + 1);
        const uploadResult = await uploadPhoto(photo, fileName);
        
        if (uploadResult.error) {
          return { success: false, error: `Interest photo ${i + 1} upload failed: ${uploadResult.error}` };
        }
        
        if (uploadResult.url) {
          interestPhotoUrls.push(uploadResult.url);
        }
      }
      console.log('Interest photos uploaded successfully');
    }

    // Step 3: Save profile photo to database
    if (profilePhotoUrl) {
      console.log('Saving profile photo to database...');
      const profilePhotoSave = await savePhotoToDatabase(userId, profilePhotoUrl, 'profile', true, 0);
      if (!profilePhotoSave.success) {
        return { success: false, error: `Profile photo database save failed: ${profilePhotoSave.error}` };
      }
    }

    // Step 4: Save interest photos to database
    if (interestPhotoUrls.length > 0) {
      console.log('Saving interest photos to database...');
      for (let i = 0; i < interestPhotoUrls.length; i++) {
        const photoSave = await savePhotoToDatabase(userId, interestPhotoUrls[i], 'interest', false, i + 1);
        if (!photoSave.success) {
          return { success: false, error: `Interest photo ${i + 1} database save failed: ${photoSave.error}` };
        }
      }
    }

    // Step 5: Update user profile with biographical information
    console.log('Updating user profile...');
    const profileUpdates: Partial<Database['public']['Tables']['profiles']['Update']> = {
      bio: data.bio,
      phone: data.phone || null,
      location: data.location,
      situation: data.situation,
      updated_at: new Date().toISOString()
    };

    const { error: profileError } = await supabase
      .from('profiles')
      .update(profileUpdates)
      .eq('id', userId);

    if (profileError) {
      console.error('Profile update error:', profileError);
      return { success: false, error: `Profile update failed: ${profileError.message}` };
    }

    // Step 6: Save questionnaire answers
    if (Object.keys(data.questionnaire).length > 0) {
      console.log('Saving questionnaire answers...');
      
      // Get question IDs from database
      const questionIds = await getQuestionIds();
      
      const answersResult = await saveAnswers(userId, data.questionnaire, questionIds);
      if (!answersResult.success) {
        return { success: false, error: `Questionnaire save failed: ${answersResult.error}` };
      }
    }

    console.log('Onboarding submission completed successfully');
    return { success: true, profileId: userId };

  } catch (error) {
    console.error('Onboarding submission error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error during onboarding submission' 
    };
  }
};

// Helper function to validate onboarding data before submission
export const validateOnboardingData = (data: OnboardingData): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Required fields validation
  if (!data.bio || data.bio.trim().length === 0) {
    errors.push('Bio is required');
  }

  if (!data.location || data.location.trim().length === 0) {
    errors.push('Location is required');
  }

  if (!data.situation || data.situation.trim().length === 0) {
    errors.push('Current situation is required');
  }

  // Bio length validation
  if (data.bio && data.bio.length > 500) {
    errors.push('Bio must be 500 characters or less');
  }

  // Photo validation
  if (data.profilePhoto) {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (data.profilePhoto.size > maxSize) {
      errors.push('Profile photo must be 5MB or smaller');
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(data.profilePhoto.type)) {
      errors.push('Profile photo must be JPG, PNG, GIF, or WebP format');
    }
  }

  // Interest photos validation
  if (data.interestPhotos && data.interestPhotos.length > 5) {
    errors.push('Maximum 5 interest photos allowed');
  }

  data.interestPhotos?.forEach((photo, index) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (photo.size > maxSize) {
      errors.push(`Interest photo ${index + 1} must be 5MB or smaller`);
    }

    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(photo.type)) {
      errors.push(`Interest photo ${index + 1} must be JPG, PNG, GIF, or WebP format`);
    }
  });

  // Phone validation (if provided)
  if (data.phone && data.phone.trim().length > 0) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
      errors.push('Please enter a valid phone number');
    }
  }

  return { valid: errors.length === 0, errors };
};

// Helper function to get upload progress (for future use with progress indicators)
export const getUploadProgress = (completed: number, total: number): number => {
  return Math.round((completed / total) * 100);
};
