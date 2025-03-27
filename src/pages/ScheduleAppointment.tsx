
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import ScheduleAppointment from '@/components/Appointments/ScheduleAppointment';

const ScheduleAppointmentPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      <ScheduleAppointment />
    </Layout>
  );
};

export default ScheduleAppointmentPage;
