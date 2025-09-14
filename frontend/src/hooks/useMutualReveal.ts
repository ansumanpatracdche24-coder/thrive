import { useState, useCallback } from 'react';

interface RevealState {
  [chatId: string]: {
    userRequested: boolean;
    partnerRequested: boolean;
    isRevealed: boolean;
  };
}

export const useMutualReveal = () => {
  const [revealStates, setRevealStates] = useState<RevealState>({
    '1': { userRequested: false, partnerRequested: false, isRevealed: false },
    '2': { userRequested: true, partnerRequested: true, isRevealed: true },
    '3': { userRequested: false, partnerRequested: true, isRevealed: false },
  });

  const requestReveal = useCallback((chatId: string) => {
    setRevealStates(prev => {
      const current = prev[chatId] || { userRequested: false, partnerRequested: false, isRevealed: false };
      const updated = { ...current, userRequested: true };
      
      // If both have requested, reveal
      if (updated.userRequested && updated.partnerRequested) {
        updated.isRevealed = true;
      }
      
      return {
        ...prev,
        [chatId]: updated
      };
    });
  }, []);

  const simulatePartnerRequest = useCallback((chatId: string) => {
    setRevealStates(prev => {
      const current = prev[chatId] || { userRequested: false, partnerRequested: false, isRevealed: false };
      const updated = { ...current, partnerRequested: true };
      
      // If both have requested, reveal
      if (updated.userRequested && updated.partnerRequested) {
        updated.isRevealed = true;
      }
      
      return {
        ...prev,
        [chatId]: updated
      };
    });
  }, []);

  const getRevealState = useCallback((chatId: string) => {
    return revealStates[chatId] || { userRequested: false, partnerRequested: false, isRevealed: false };
  }, [revealStates]);

  return {
    revealStates,
    requestReveal,
    simulatePartnerRequest,
    getRevealState
  };
};