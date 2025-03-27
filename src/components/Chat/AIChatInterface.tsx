
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, ArrowRight, CalendarPlus, Phone, User, Paperclip } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  time: string;
  actionButtons?: {
    type: 'appointment' | 'doctor-selection' | 'call';
    data?: any;
  };
}

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  image: string;
}

const AIChatInterface: React.FC = () => {
  const { profile } = useAuth();
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your medical assistant. How can I help you today?",
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [doctorSearchQuery, setDoctorSearchQuery] = useState('');
  const [showDoctorSearch, setShowDoctorSearch] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample doctors data - in a real app this would come from your API
  const doctors: Doctor[] = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      specialty: "Dermatologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Dr. Emma Wilson",
      specialty: "Neurologist",
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Dr. James Miller",
      specialty: "Orthopedic",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=300&auto=format&fit=crop"
    }
  ];

  // Specialties
  const specialties = [
    "Cardiologist", 
    "Dermatologist", 
    "Neurologist", 
    "Orthopedic", 
    "Pediatrician",
    "Psychiatrist",
    "Ophthalmologist",
    "ENT Specialist"
  ];

  const filteredDoctors = doctors.filter(doctor => 
    selectedSpecialty ? doctor.specialty === selectedSpecialty : true
  ).filter(doctor => 
    doctor.name.toLowerCase().includes(doctorSearchQuery.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // In a real app, this would call the Gemini API
  const getAIResponse = async (userMessage: string): Promise<string> => {
    // For now, we'll simulate responses
    const lowerCaseMessage = userMessage.toLowerCase();
    
    if (lowerCaseMessage.includes('headache') || lowerCaseMessage.includes('migraine')) {
      return "It sounds like you might be experiencing headaches. This could be due to various reasons like stress, dehydration, or eye strain. Would you like me to help you book an appointment with a Neurologist?";
    } else if (lowerCaseMessage.includes('skin') || lowerCaseMessage.includes('rash') || lowerCaseMessage.includes('acne')) {
      return "Based on your description, you might want to consult with a Dermatologist. Would you like me to help you find available dermatologists?";
    } else if (lowerCaseMessage.includes('heart') || lowerCaseMessage.includes('chest pain') || lowerCaseMessage.includes('palpitations')) {
      return "Chest pain or heart palpitations could be serious. I recommend speaking with a Cardiologist. Would you like me to help you book an urgent appointment?";
    } else if (lowerCaseMessage.includes('joint') || lowerCaseMessage.includes('bone') || lowerCaseMessage.includes('back pain')) {
      return "Joint or bone pain could be better addressed by an Orthopedic specialist. Would you like me to help you book an appointment?";
    } else if (lowerCaseMessage.includes('appointment') || lowerCaseMessage.includes('book') || lowerCaseMessage.includes('schedule')) {
      return "I can help you book an appointment. What kind of specialist would you like to see?";
    } else {
      return "I understand you're not feeling well. Could you provide more details about your symptoms so I can help you find the right specialist?";
    }
  };

  const handleSpecialtySelection = (specialty: string) => {
    setSelectedSpecialty(specialty);
    
    const newMessage: Message = {
      id: messages.length + 1,
      text: `I've selected doctors specializing in ${specialty}. Please choose a doctor to schedule your appointment:`,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: {
        type: 'doctor-selection',
        data: doctors.filter(doctor => doctor.specialty === specialty)
      }
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setShowDoctorSearch(true);
  };

  const handleDoctorSelection = (doctor: Doctor) => {
    const confirmationMessage: Message = {
      id: messages.length + 1,
      text: `You've selected ${doctor.name}. Would you like to schedule an appointment or start a call?`,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actionButtons: {
        type: 'appointment',
        data: doctor
      }
    };
    
    setMessages(prevMessages => [...prevMessages, confirmationMessage]);
    setShowDoctorSearch(false);
  };

  const handleBookAppointment = (doctor: Doctor) => {
    // In a real app, store the selected doctor in state or context
    localStorage.setItem('selectedDoctor', JSON.stringify(doctor));
    navigate('/schedule-appointment');
  };

  const handleStartCall = (doctor: Doctor) => {
    // For now, just show a toast message
    toast({
      title: "Video call feature",
      description: `Video call with ${doctor.name} will be available in future updates.`,
    });
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (input.trim() === '') return;
    
    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const aiResponse = await getAIResponse(input);
      
      // Analyze the message to determine if we should ask for specialty
      const shouldOfferSpecialties = aiResponse.includes('specialist') || 
                                     aiResponse.includes('appointment') ||
                                     aiResponse.includes('book');
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        ...(shouldOfferSpecialties && {
          actionButtons: {
            type: 'appointment'
          }
        })
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "I'm sorry, I'm having trouble processing your request. Please try again later.",
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-fade-in">
      <div className="p-4 bg-white border-b border-gray-200">
        <h1 className="text-xl font-semibold">Health Assistant</h1>
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
                
                {message.actionButtons?.type === 'appointment' && (
                  <div className="mt-3 space-y-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full justify-start text-sm"
                      onClick={() => setSelectedSpecialty(null)}
                    >
                      <CalendarPlus className="h-4 w-4 mr-2" />
                      Choose Specialty
                    </Button>
                    
                    {message.actionButtons.data && (
                      <>
                        <Button 
                          size="sm"
                          variant="default" 
                          className="w-full justify-start text-sm"
                          onClick={() => handleBookAppointment(message.actionButtons?.data)}
                        >
                          <CalendarPlus className="h-4 w-4 mr-2" />
                          Book Appointment
                        </Button>
                        <Button 
                          size="sm"
                          variant="secondary" 
                          className="w-full justify-start text-sm"
                          onClick={() => handleStartCall(message.actionButtons?.data)}
                        >
                          <Phone className="h-4 w-4 mr-2" />
                          Start Call
                        </Button>
                      </>
                    )}
                  </div>
                )}
                
                {message.actionButtons?.type === 'doctor-selection' && (
                  <div className="mt-3 grid grid-cols-1 gap-2">
                    {message.actionButtons.data?.length > 0 ? (
                      message.actionButtons.data.map((doctor: Doctor) => (
                        <div 
                          key={doctor.id}
                          className="flex items-center p-2 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                          onClick={() => handleDoctorSelection(doctor)}
                        >
                          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{doctor.name}</p>
                            <p className="text-xs text-gray-500">{doctor.specialty}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 ml-auto text-gray-400" />
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">No doctors found for this specialty.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Specialty selection */}
      {selectedSpecialty === null && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <h3 className="text-sm font-medium mb-2">Choose a specialty:</h3>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {specialties.map(specialty => (
              <Button 
                key={specialty}
                variant="outline"
                size="sm"
                className="justify-start"
                onClick={() => handleSpecialtySelection(specialty)}
              >
                <User className="h-4 w-4 mr-2" />
                {specialty}
              </Button>
            ))}
          </div>
        </div>
      )}
      
      {/* Doctor search */}
      {showDoctorSearch && (
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="mb-3">
            <h3 className="text-sm font-medium mb-2">Search doctors:</h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  {doctorSearchQuery || "Search doctors..."}
                  <User className="h-4 w-4 ml-2 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="p-0" align="start">
                <Command>
                  <CommandInput 
                    placeholder="Search doctors..." 
                    value={doctorSearchQuery}
                    onValueChange={setDoctorSearchQuery}
                  />
                  <CommandList>
                    <CommandEmpty>No doctors found.</CommandEmpty>
                    <CommandGroup>
                      {filteredDoctors.map(doctor => (
                        <CommandItem 
                          key={doctor.id}
                          onSelect={() => {
                            handleDoctorSelection(doctor);
                            setDoctorSearchQuery('');
                          }}
                          className="flex items-center"
                        >
                          <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                            <img
                              src={doctor.image}
                              alt={doctor.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-medium">{doctor.name}</p>
                            <p className="text-xs text-gray-500">{doctor.specialty}</p>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      )}
      
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
            className="bg-medical-blue text-white rounded-full"
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

export default AIChatInterface;
