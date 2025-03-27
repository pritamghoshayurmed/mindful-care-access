
import React from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const ChatList: React.FC = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  
  // Sample chat conversations
  const conversations = [
    {
      id: 1,
      name: isDoctor ? "John Smith" : "Dr. Sarah Johnson",
      lastMessage: "I'll see you at your appointment tomorrow",
      time: "10:30 AM",
      unread: 2,
      image: isDoctor 
        ? "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      name: isDoctor ? "Emma Wilson" : "Dr. Michael Brown",
      lastMessage: "Please let me know if you have any questions",
      time: "Yesterday",
      unread: 0,
      image: isDoctor 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Messages</h1>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search conversations"
          className="medical-input pl-10"
        />
      </div>
      
      <div className="space-y-3">
        {conversations.map(conversation => (
          <Link key={conversation.id} to={`/chat/${conversation.id}`}>
            <div className="medical-card p-3 flex items-center space-x-3">
              <div className="relative">
                <div className="h-14 w-14 rounded-full overflow-hidden">
                  <img
                    src={conversation.image}
                    alt={conversation.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {conversation.unread > 0 && (
                  <div className="absolute -top-1 -right-1 h-5 w-5 bg-medical-blue text-white rounded-full flex items-center justify-center text-xs">
                    {conversation.unread}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium">{conversation.name}</h3>
                  <span className="text-xs text-medical-darkGray">{conversation.time}</span>
                </div>
                <p className="text-sm text-medical-darkGray truncate">
                  {conversation.lastMessage}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
