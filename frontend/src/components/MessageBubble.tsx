import React from 'react';
import { Check, CheckCheck, Eye } from 'lucide-react';
import { MessageStatus } from '@/hooks/useMessageStatus';

interface MessageBubbleProps {
  message: string;
  isOwn: boolean;
  timestamp: Date;
  status?: MessageStatus;
  senderName?: string;
  isOnline?: boolean;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isOwn,
  timestamp,
  status = 'sent',
  senderName,
  isOnline = false
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'sending':
        return <div className="w-3 h-3 border border-current rounded-full animate-spin border-t-transparent" />;
      case 'sent':
        return <Check className="w-3 h-3 text-muted-foreground" />;
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-muted-foreground" />;
      case 'read':
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex items-end space-x-2 mb-4 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar placeholder for non-own messages */}
      {!isOwn && (
        <div className="w-8 h-8 bg-gradient-accent rounded-full flex items-center justify-center text-xs font-semibold text-accent-foreground flex-shrink-0">
          {senderName?.charAt(0) || '?'}
        </div>
      )}
      
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'ml-auto' : 'mr-auto'}`}>
        {/* Sender name and online indicator for non-own messages */}
        {!isOwn && (
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-xs text-muted-foreground font-medium">
              {senderName || 'Unknown'}
            </span>
            {isOnline && (
              <div className="relative">
                <Eye className="w-3 h-3 text-green-500 animate-pulse" />
                <span className="sr-only">Online now</span>
              </div>
            )}
          </div>
        )}
        
        {/* Message bubble */}
        <div
          className={`relative px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-primary text-primary-foreground ml-4'
              : 'bg-secondary text-secondary-foreground mr-4'
          }`}
        >
          <p className="text-sm leading-relaxed break-words">{message}</p>
          
          {/* Message tail */}
          <div
            className={`absolute bottom-0 w-3 h-3 ${
              isOwn
                ? 'right-0 transform translate-x-1 bg-primary'
                : 'left-0 transform -translate-x-1 bg-secondary'
            }`}
            style={{
              clipPath: isOwn
                ? 'polygon(0 0, 100% 0, 0 100%)'
                : 'polygon(100% 0, 100% 100%, 0 0)'
            }}
          />
        </div>
        
        {/* Timestamp and status */}
        <div className={`flex items-center space-x-1 mt-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-muted-foreground">
            {formatTime(timestamp)}
          </span>
          {isOwn && (
            <div className="flex items-center">
              {getStatusIcon()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};