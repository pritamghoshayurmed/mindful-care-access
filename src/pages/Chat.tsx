
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import ChatList from '@/components/Chat/ChatList';

const Chat: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <ChatList />
    </Layout>
  );
};

export default Chat;
