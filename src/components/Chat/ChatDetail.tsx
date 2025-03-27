
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Paperclip } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'other';
  time: string;
}

const ChatDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Chat details
  const chatDetails = {
    id: Number(id),
    name: isDoctor ? "John Smith" : "Dr. Sarah Johnson",
    image: isDoctor 
      ? "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop" 
      : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
    status: "Online",
    messages: [
      {
        id: 1,
        text: "Hello, how are you feeling today?",
        sender: 'other' as const,
        time: "10:00 AM"
      },
      {
        id: 2,
        text: "I'm feeling much better after taking the medication you prescribed. The fever has gone down.",
        sender: 'user' as const,
        time: "10:05 AM"
      },
      {
        id: 3,
        text: "That's great to hear. Any other symptoms I should know about?",
        sender: 'other' as const,
        time: "10:08 AM"
      },
      {
        id: 4,
        text: "No, just a mild cough that's also improving.",
        sender: 'user' as const,
        time: "10:10 AM"
      },
      {
        id: 5,
        text: "Perfect. Continue with the medication for 3 more days as prescribed. Don't hesitate to message me if you have any concerns.",
        sender: 'other' as const,
        time: "10:15 AM"
      }
    ]
  };
  
  const [messages, setMessages] = useState<Message[]>(chatDetails.messages);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prevMessages => [...prevMessages, newMsg]);
    setNewMessage('');
    
    // Simulate reply after 1 second
    setTimeout(() => {
      const replyMsg: Message = {
        id: messages.length + 2,
        text: "I've received your message. I'll get back to you shortly.",
        sender: 'other',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, replyMsg]);
    }, 1000);
  };
  
  return (
    <div className="flex flex-col h-screen animate-fade-in">
      {/* Chat header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
          <img
            src={chatDetails.image}
            alt={chatDetails.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-medium">{chatDetails.name}</h2>
          <p className="text-xs text-green-500">{chatDetails.status}</p>
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] rounded-xl p-3 ${
                  message.sender === 'user'
                    ? 'bg-medical-blue text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <button
            type="button"
            className="p-2 rounded-full text-medical-darkGray hover:bg-gray-100 mr-2"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="medical-input flex-1"
          />
          <button
            type="submit"
            className="ml-2 p-3 bg-medical-blue text-white rounded-full"
            disabled={newMessage.trim() === ''}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
