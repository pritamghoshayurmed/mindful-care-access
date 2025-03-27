
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Send, CalendarPlus, Phone, User, Paperclip, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  description: string;
  address: string;
  url: string;
  distance?: string;
  image?: string;
}

interface LocationState {
  status: 'idle' | 'requesting' | 'granted' | 'denied';
  position: {
    latitude: number | null;
    longitude: number | null;
  };
}

const AIChat: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Kabiraj health assistant. To help you better, may I access your location?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [showDoctors, setShowDoctors] = useState(false);
  const [location, setLocation] = useState<LocationState>({
    status: 'idle',
    position: {
      latitude: null,
      longitude: null
    }
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Function to request location permission
  const requestLocationPermission = () => {
    setLocation(prev => ({ ...prev, status: 'requesting' }));
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          status: 'granted',
          position: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        });
        
        const confirmMessage: Message = {
          id: messages.length + 1,
          text: "Thank you for sharing your location. How can I help you today?",
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, confirmMessage]);
      },
      (error) => {
        console.error("Error obtaining location", error);
        setLocation(prev => ({ ...prev, status: 'denied' }));
        
        const errorMessage: Message = {
          id: messages.length + 1,
          text: "I couldn't access your location. I'll still try to help, but I won't be able to find doctors near you.",
          sender: 'bot',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        setMessages(prev => [...prev, errorMessage]);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check if message contains doctor specialty mentions
  const extractSpecialty = (text: string): string | null => {
    const specialties = [
      "Cardiologist", "Dermatologist", "Neurologist", "Orthopedic", 
      "Pediatrician", "Psychiatrist", "Ophthalmologist", "ENT",
      "Gynecologist", "Urologist", "Endocrinologist", "Gastroenterologist",
      "Rheumatologist", "Nephrologist", "Pulmonologist", "Oncologist",
      "Hematologist", "Immunologist", "Surgeon", "Family Medicine"
    ];
    
    // Check for specialty mentions
    for (const specialty of specialties) {
      if (text.toLowerCase().includes(specialty.toLowerCase())) {
        return specialty;
      }
    }
    
    return null;
  };

  // Search for doctors based on specialty and location
  const searchDoctors = async (specialty: string) => {
    if (location.status !== 'granted' || !location.position.latitude || !location.position.longitude) {
      toast({
        title: "Location Required",
        description: "Please allow location access to find doctors near you.",
        variant: "destructive"
      });
      requestLocationPermission();
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('search-doctors', {
        body: { 
          specialty, 
          location: {
            latitude: location.position.latitude,
            longitude: location.position.longitude
          }
        }
      });
      
      if (error) throw error;
      
      setDoctors(data.doctors || []);
      setShowDoctors(true);
      
      // Add placeholder images for doctors without them
      const doctorsWithImages = data.doctors.map((doctor: Doctor) => ({
        ...doctor,
        image: doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=16A34A&color=fff`
      }));
      
      setDoctors(doctorsWithImages);
      
      const doctorMessage: Message = {
        id: messages.length + 1,
        text: `I've found some ${specialty} specialists near you. Would you like to schedule an appointment with one of them?`,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, doctorMessage]);
    } catch (error) {
      console.error("Error searching for doctors:", error);
      toast({
        title: "Search Error",
        description: "Unable to find doctors at this time. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending message to AI
  const sendMessageToAI = async (messageText: string) => {
    setIsLoading(true);
    
    try {
      // Prepare conversation history
      const conversation = messages.map(msg => ({
        text: msg.text,
        sender: msg.sender
      }));
      
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { message: messageText, conversation }
      });
      
      if (error) throw error;
      
      const aiResponse = data.response;
      
      const botMessage: Message = {
        id: messages.length + 1,
        text: aiResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, botMessage]);
      
      // Check if the response mentions a medical specialty
      const specialty = extractSpecialty(aiResponse);
      if (specialty && location.status === 'granted') {
        // Wait a moment before showing the doctor search results
        setTimeout(() => {
          searchDoctors(specialty);
        }, 1000);
      }
    } catch (error) {
      console.error("Error sending message to AI:", error);
      const errorMessage: Message = {
        id: messages.length + 1,
        text: "I'm sorry, I'm having trouble responding right now. Please try again later.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    // Handle location permission request
    if (location.status === 'idle' && input.toLowerCase().includes('yes')) {
      requestLocationPermission();
      const userMessage: Message = {
        id: messages.length + 1,
        text: input,
        sender: 'user',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      return;
    }
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Send message to AI
    await sendMessageToAI(input);
  };

  // Handle booking an appointment with a doctor
  const handleBookAppointment = (doctor: Doctor) => {
    // Store selected doctor in localStorage
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    navigate('/schedule-appointment');
  };

  // Handle starting a call with a doctor
  const handleStartCall = (doctor: Doctor) => {
    // Generate a call ID and navigate to the call page
    const callId = Math.random().toString(36).substring(2, 15);
    localStorage.setItem('currentCall', JSON.stringify({
      id: callId,
      doctor: doctor,
      startTime: new Date().toISOString()
    }));
    navigate(`/call/${callId}`);
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold">Kabiraj Health Assistant</h1>
        <p className="text-sm text-medical-darkGray">AI-powered medical chat</p>
      </div>
      
      {/* Chat messages */}
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
                    ? 'bg-medical-green text-white rounded-tr-none'
                    : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                }`}>
                  {message.time}
                </p>
              </div>
            </div>
          ))}
          
          {/* Location permission request */}
          {location.status === 'idle' && (
            <div className="flex justify-center my-4">
              <Button 
                variant="default" 
                className="bg-medical-green hover:bg-medical-darkGreen mr-2"
                onClick={requestLocationPermission}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Allow Location
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setLocation(prev => ({ ...prev, status: 'denied' }));
                  const message: Message = {
                    id: messages.length + 1,
                    text: "That's okay. I'll still try to help you, but I won't be able to find doctors near you. How can I assist you today?",
                    sender: 'bot',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                  };
                  setMessages(prev => [...prev, message]);
                }}
              >
                Not Now
              </Button>
            </div>
          )}
          
          {/* Doctor search results */}
          {showDoctors && doctors.length > 0 && (
            <div className="my-4">
              <h3 className="text-sm font-medium mb-2 text-medical-darkGreen">Recommended Doctors Near You:</h3>
              <div className="space-y-3">
                {doctors.map(doctor => (
                  <div 
                    key={doctor.id}
                    className="flex items-start p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
                  >
                    <div className="h-12 w-12 rounded-full overflow-hidden mr-3 flex-shrink-0">
                      <img
                        src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=16A34A&color=fff`}
                        alt={doctor.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{doctor.name}</p>
                      <p className="text-xs text-medical-darkGreen font-medium">{doctor.specialty}</p>
                      <p className="text-xs text-gray-500 truncate">{doctor.address}</p>
                      <div className="flex mt-2 space-x-2">
                        <Button 
                          size="sm"
                          variant="default" 
                          className="text-xs py-1 h-auto bg-medical-green hover:bg-medical-darkGreen"
                          onClick={() => handleBookAppointment(doctor)}
                        >
                          <CalendarPlus className="h-3 w-3 mr-1" />
                          Book
                        </Button>
                        <Button 
                          size="sm"
                          variant="secondary" 
                          className="text-xs py-1 h-auto"
                          onClick={() => handleStartCall(doctor)}
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Message input */}
      <div className="p-4 bg-white border-t border-gray-200">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="rounded-full text-medical-darkGray"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your symptoms or questions..."
            className="medical-input flex-1 mx-2"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            className="bg-medical-green hover:bg-medical-darkGreen text-white rounded-full"
            disabled={isLoading || input.trim() === ''}
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Send className="h-5 w-5" />
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AIChat;
