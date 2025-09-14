import { useState, useEffect } from 'react';

export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read';

interface MessageStatusData {
  messageId: string;
  status: MessageStatus;
  timestamp: Date;
}

export const useMessageStatus = () => {
  const [messageStatuses, setMessageStatuses] = useState<Record<string, MessageStatusData>>({});

  const updateMessageStatus = (messageId: string, status: MessageStatus) => {
    setMessageStatuses(prev => ({
      ...prev,
      [messageId]: {
        messageId,
        status,
        timestamp: new Date()
      }
    }));
  };

  const getMessageStatus = (messageId: string): MessageStatus => {
    return messageStatuses[messageId]?.status ?? 'sending';
  };

  // Simulate message status progression
  const simulateMessageDelivery = (messageId: string) => {
    // Start as sending
    updateMessageStatus(messageId, 'sending');
    
    // After 500ms, mark as sent
    setTimeout(() => {
      updateMessageStatus(messageId, 'sent');
    }, 500);
    
    // After 1.5s, mark as delivered
    setTimeout(() => {
      updateMessageStatus(messageId, 'delivered');
    }, 1500);
    
    // After 3s, maybe mark as read (70% chance)
    setTimeout(() => {
      if (Math.random() < 0.7) {
        updateMessageStatus(messageId, 'read');
      }
    }, 3000);
  };

  return {
    messageStatuses,
    updateMessageStatus,
    getMessageStatus,
    simulateMessageDelivery
  };
};