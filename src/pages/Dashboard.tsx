
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/Layout/Layout';
import PatientDashboard from '@/components/Dashboard/PatientDashboard';
import DoctorDashboard from '@/components/Dashboard/DoctorDashboard';

const Dashboard: React.FC = () => {
  const { profile, isAuthenticated } = useAuth();
  
  // Redirect if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <Layout>
      {profile?.role === 'doctor' ? <DoctorDashboard /> : <PatientDashboard />}
    </Layout>
  );
};

export default Dashboard;
