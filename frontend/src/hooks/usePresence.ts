import { useState, useEffect } from 'react';

interface UserPresence {
  userId: string;
  isOnline: boolean;
  lastSeen: Date;
}

export const usePresence = () => {
  const [userPresence, setUserPresence] = useState<Record<string, UserPresence>>({});

  useEffect(() => {
    // Simulate some users being online
    const mockPresence: Record<string, UserPresence> = {
      'user1': { userId: 'user1', isOnline: true, lastSeen: new Date() },
      'user2': { userId: 'user2', isOnline: false, lastSeen: new Date(Date.now() - 300000) },
      'user3': { userId: 'user3', isOnline: true, lastSeen: new Date() },
      'user4': { userId: 'user4', isOnline: false, lastSeen: new Date(Date.now() - 600000) },
    };

    setUserPresence(mockPresence);

    // Simulate presence updates
    const interval = setInterval(() => {
      setUserPresence(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(userId => {
          // Randomly toggle online status
          if (Math.random() < 0.1) {
            updated[userId] = {
              ...updated[userId],
              isOnline: !updated[userId].isOnline,
              lastSeen: new Date()
            };
          }
        });
        return updated;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const isUserOnline = (userId: string): boolean => {
    return userPresence[userId]?.isOnline ?? false;
  };

  const getUserLastSeen = (userId: string): Date | null => {
    return userPresence[userId]?.lastSeen ?? null;
  };

  return {
    userPresence,
    isUserOnline,
    getUserLastSeen
  };
};