
import React from 'react';
import Layout from '@/components/Layout/Layout';
import AIChatInterface from '@/components/Chat/AIChatInterface';
import { useAuth } from '@/contexts/AuthContext';

const AIChat: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <AIChatInterface />
    </Layout>
  );
};

export default AIChat;
