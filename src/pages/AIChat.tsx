
import React from 'react';
import Layout from '@/components/Layout/Layout';
import AIChat from '@/components/Chat/AIChat';
import { useAuth } from '@/contexts/AuthContext';

const AIChatPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <AIChat />
    </Layout>
  );
};

export default AIChatPage;
