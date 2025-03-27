
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, MessageSquare, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Navbar: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';

  const navItems = [
    {
      path: '/dashboard',
      label: 'Home',
      icon: Home,
    },
    {
      path: '/appointments',
      label: 'Schedule',
      icon: Calendar,
    },
    {
      path: '/chat',
      label: 'Messages',
      icon: MessageSquare,
    },
    {
      path: '/profile',
      label: 'Profile',
      icon: User,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10 animate-slide-in-bottom">
      <div className="max-w-md mx-auto px-4">
        <div className="flex justify-between py-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex flex-col items-center"
              >
                <div
                  className={`p-2 rounded-xl transition-colors ${
                    isActive ? 'text-medical-blue' : 'text-gray-400'
                  }`}
                >
                  <item.icon size={22} />
                </div>
                <span
                  className={`text-xs ${
                    isActive ? 'text-medical-blue font-medium' : 'text-gray-500'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
