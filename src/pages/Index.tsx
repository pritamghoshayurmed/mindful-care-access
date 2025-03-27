
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Splash from '@/components/Splash';

const Index: React.FC = () => {
  const navigate = useNavigate();

  // Redirect to splash screen
  useEffect(() => {
    navigate('/splash');
  }, [navigate]);

  return <Splash />;
};

export default Index;
