
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ChatDetail from '@/components/Chat/ChatDetail';

const ChatDetailPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <ChatDetail />;
};

export default ChatDetailPage;
