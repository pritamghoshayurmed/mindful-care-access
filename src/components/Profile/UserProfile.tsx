
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ChevronRight, LogOut, UserCog, Bell, Shield, HelpCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const UserProfile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/login');
  };

  const menuItems = [
    {
      icon: UserCog,
      title: 'Account Settings',
      description: 'Manage your personal information',
      route: '/account-settings',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure notification preferences',
      route: '/notifications-settings',
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your security settings',
      route: '/privacy-settings',
    },
    {
      icon: HelpCircle,
      title: 'Help & Support',
      description: 'Get help and contact support',
      route: '/help',
    },
    {
      icon: Settings,
      title: 'App Settings',
      description: 'Configure app preferences',
      route: '/app-settings',
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Profile</h1>
      </div>

      {/* Profile Header */}
      <div className="medical-card p-6 flex flex-col items-center">
        <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-medical-lightBlue mb-4">
          <img
            src={user?.profilePicture}
            alt={user?.name}
            className="h-full w-full object-cover"
          />
        </div>
        <h2 className="text-xl font-semibold">{user?.name}</h2>
        <p className="text-medical-darkGray mb-2">{user?.email}</p>
        <span className="px-3 py-1 bg-medical-lightBlue text-medical-blue text-xs rounded-full capitalize">
          {user?.role}
        </span>
      </div>

      {/* Menu Options */}
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="medical-card p-4 flex items-center cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(item.route)}
          >
            <div className="p-2 rounded-xl bg-medical-lightBlue mr-4">
              <item.icon className="h-5 w-5 text-medical-blue" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-xs text-medical-darkGray">{item.description}</p>
            </div>
            <ChevronRight className="h-5 w-5 text-medical-darkGray" />
          </div>
        ))}
      </div>

      {/* Logout Button */}
      <Button
        variant="outline"
        className="w-full border border-red-200 text-red-500 hover:bg-red-50"
        onClick={handleLogout}
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log Out
      </Button>
    </div>
  );
};

export default UserProfile;
