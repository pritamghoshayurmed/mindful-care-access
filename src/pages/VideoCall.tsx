
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import VideoCallComponent from '@/components/Call/VideoCall';

const VideoCallPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <VideoCallComponent />;
};

export default VideoCallPage;
