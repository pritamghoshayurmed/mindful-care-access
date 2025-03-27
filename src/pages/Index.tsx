
import React from 'react';
import { Navigate } from 'react-router-dom';

const Index: React.FC = () => {
  // Use Navigate component instead of useNavigate hook
  return <Navigate to="/splash" replace />;
};

export default Index;
