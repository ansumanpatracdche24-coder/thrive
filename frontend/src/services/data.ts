import { supabase } from './supabaseClient';
import type { Database } from '@/integrations/supabase/types';

// Type definitions
type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];
type Match = Database['public']['Tables']['matches']['Row'];
type Notification = Database['public']['Tables']['notifications']['Row'];

// Interface for match history with partner details
export interface MatchHistoryItem {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerAvatar: string | null;
  matchedAt: string;
  isActive: boolean;
}

// Interface for profile update data
export interface ProfileUpdateData {
  name?: string;
  bio?: string;
  age?: number;
  location?: string;
  interests?: string[];
  occupation?: string;
  education?: string;
  height?: number;
  relationship_goals?: string;
  personality_traits?: string[];
}

// Interface for notification data
export interface NotificationData {
  id: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  relatedUserId?: string;
  relatedMatchId?: string;
}

/**
 * Updates the current user's profile with new data
 * @param profileData - Object containing profile fields to update
 * @returns Promise with success status and updated profile data
 */
export const updateUserProfile = async (profileData: ProfileUpdateData) => {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Update profile in database
    const { data, error } = await (supabase as any)
      .from('profiles')
      .update(profileData)
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return {
      success: true,
      data,
      message: 'Profile updated successfully'
    };

  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update profile',
      data: null
    };
  }
};

/**
 * Fetches all matches for the current user with partner details
 * @returns Promise with array of match history items
 */
export const getMatchHistory = async (): Promise<{
  success: boolean;
  data: MatchHistoryItem[] | null;
  error?: string;
}> => {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Fetch matches for current user
    const { data: matches, error: matchesError } = await supabase
      .from('matches')
      .select(`
        id,
        profile1_id,
        profile2_id,
        created_at,
        is_active
      `)
      .or(`profile1_id.eq.${user.id},profile2_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (matchesError) {
      throw matchesError;
    }

    if (!matches || matches.length === 0) {
      return {
        success: true,
        data: []
      };
    }

    // Get partner details for each match
    const matchHistoryPromises = matches.map(async (match: any) => {
      const partnerId = match.profile1_id === user.id ? match.profile2_id : match.profile1_id;
      
      // Fetch partner profile
      const { data: partnerProfile, error: profileError } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', partnerId)
        .single();

      // Fetch partner's primary photo
      const { data: partnerPhoto, error: photoError } = await supabase
        .from('photos')
        .select('url')
        .eq('profile_id', partnerId)
        .eq('is_primary', true)
        .single();

      return {
        id: match.id,
        partnerId,
        partnerName: (partnerProfile as any)?.name || 'Unknown User',
        partnerAvatar: (partnerPhoto as any)?.url || null,
        matchedAt: match.created_at,
        isActive: match.is_active || false
      } as MatchHistoryItem;
    });

    const matchHistory = await Promise.all(matchHistoryPromises);

    return {
      success: true,
      data: matchHistory
    };

  } catch (error) {
    console.error('Error fetching match history:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch match history'
    };
  }
};

/**
 * Fetches all notifications for the current user, sorted by newest first
 * @returns Promise with array of notifications
 */
export const getNotifications = async (): Promise<{
  success: boolean;
  data: NotificationData[] | null;
  error?: string;
}> => {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Fetch notifications for current user
    const { data: notifications, error: notificationsError } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (notificationsError) {
      throw notificationsError;
    }

    // Transform notifications to match interface
    const notificationData: NotificationData[] = (notifications || []).map((notification: any) => ({
      id: notification.id,
      type: notification.type,
      title: notification.title,
      message: notification.message,
      isRead: notification.is_read,
      createdAt: notification.created_at,
      relatedUserId: notification.related_user_id || undefined,
      relatedMatchId: notification.related_match_id || undefined
    }));

    return {
      success: true,
      data: notificationData
    };

  } catch (error) {
    console.error('Error fetching notifications:', error);
    return {
      success: false,
      data: null,
      error: error instanceof Error ? error.message : 'Failed to fetch notifications'
    };
  }
};

/**
 * Marks a specific notification as read
 * @param notificationId - ID of the notification to mark as read
 * @returns Promise with success status
 */
export const markNotificationAsRead = async (notificationId: string): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Update notification read status
    const { error } = await (supabase as any)
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId)
      .eq('user_id', user.id); // Ensure user can only update their own notifications

    if (error) {
      throw error;
    }

    return {
      success: true
    };

  } catch (error) {
    console.error('Error marking notification as read:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark notification as read'
    };
  }
};

/**
 * Marks all notifications as read for the current user
 * @returns Promise with success status
 */
export const markAllNotificationsAsRead = async (): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Update all unread notifications
    const { error } = await (supabase as any)
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      throw error;
    }

    return {
      success: true
    };

  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark all notifications as read'
    };
  }
};

/**
 * Gets the count of unread notifications for the current user
 * @returns Promise with unread count
 */
export const getUnreadNotificationCount = async (): Promise<{
  success: boolean;
  count: number;
  error?: string;
}> => {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      throw new Error('User not authenticated');
    }

    // Count unread notifications
    const { count, error } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (error) {
      throw error;
    }

    return {
      success: true,
      count: count || 0
    };

  } catch (error) {
    console.error('Error getting unread notification count:', error);
    return {
      success: false,
      count: 0,
      error: error instanceof Error ? error.message : 'Failed to get unread notification count'
    };
  }
};

/**
 * Creates a new notification for a user
 * @param userId - ID of the user to notify
 * @param type - Type of notification (match, message, like, etc.)
 * @param title - Notification title
 * @param message - Notification message
 * @param relatedUserId - Optional related user ID
 * @param relatedMatchId - Optional related match ID
 * @returns Promise with success status
 */
export const createNotification = async (
  userId: string,
  type: string,
  title: string,
  message: string,
  relatedUserId?: string,
  relatedMatchId?: string
): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const { error } = await (supabase as any)
      .from('notifications')
      .insert({
        user_id: userId,
        type,
        title,
        message,
        is_read: false,
        related_user_id: relatedUserId || null,
        related_match_id: relatedMatchId || null
      });

    if (error) {
      throw error;
    }

    return {
      success: true
    };

  } catch (error) {
    console.error('Error creating notification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create notification'
    };
  }
};
