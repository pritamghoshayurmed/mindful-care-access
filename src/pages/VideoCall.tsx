
import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import VideoCallComponent from '@/components/Call/VideoCall';

const VideoCallPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { id } = useParams();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return <VideoCallComponent />;
};

export default VideoCallPage;
