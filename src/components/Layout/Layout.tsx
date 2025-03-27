
import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '@/contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  
  // Don't show navbar on splash or welcome screens
  const hiddenNavbarPaths = ['/', '/splash', '/welcome', '/login', '/register'];
  const shouldShowNavbar = isAuthenticated && !hiddenNavbarPaths.includes(location.pathname);

  return (
    <div className="min-h-screen bg-medical-gray">
      <main className="page-container">
        <div className="animate-fade-in">
          {children}
        </div>
      </main>
      {shouldShowNavbar && <Navbar />}
    </div>
  );
};

export default Layout;
