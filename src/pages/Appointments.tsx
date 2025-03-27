
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import AppointmentList from '@/components/Appointments/AppointmentList';

const Appointments: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <AppointmentList />
    </Layout>
  );
};

export default Appointments;
