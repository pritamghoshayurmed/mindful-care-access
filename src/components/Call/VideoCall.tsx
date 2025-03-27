
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Mic, MicOff, Video, VideoOff, Phone, User, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const VideoCall: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  
  // In a real app, you would fetch the appointment details based on the ID
  const appointmentDetails = {
    id: Number(id),
    doctor: {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
    },
    date: "Today",
    time: "10:30 AM",
    status: "Scheduled"
  };
  
  const handleConnect = () => {
    // In a real app, this would initialize the WebRTC connection
    setIsConnected(true);
    toast({
      title: "Connected",
      description: `You are now connected with ${appointmentDetails.doctor.name}`,
    });
  };
  
  const handleEndCall = () => {
    // In a real app, this would close the WebRTC connection
    toast({
      title: "Call Ended",
      description: "The call has been ended.",
    });
    navigate('/appointments');
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    toast({
      description: isMuted ? "Microphone unmuted" : "Microphone muted",
    });
  };
  
  const toggleCamera = () => {
    setIsCameraOff(!isCameraOff);
    toast({
      description: isCameraOff ? "Camera turned on" : "Camera turned off",
    });
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
            <img
              src={appointmentDetails.doctor.image}
              alt={appointmentDetails.doctor.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-medium">{appointmentDetails.doctor.name}</h2>
            <p className="text-xs text-medical-darkGray">{appointmentDetails.doctor.specialty}</p>
          </div>
        </div>
        <div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(`/chat/${id}`)}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </Button>
        </div>
      </div>
      
      {/* Video area */}
      <div className="flex-1 bg-gray-900 relative">
        {isConnected ? (
          <>
            {/* Remote video (doctor) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                {isCameraOff ? (
                  <div className="text-center">
                    <User className="h-20 w-20 mx-auto text-gray-600" />
                    <p className="text-gray-400 mt-2">Camera is off</p>
                  </div>
                ) : (
                  <img
                    src={appointmentDetails.doctor.image}
                    alt={appointmentDetails.doctor.name}
                    className="h-full object-cover"
                  />
                )}
              </div>
            </div>
            
            {/* Local video (patient) */}
            <div className="absolute bottom-4 right-4 w-32 h-48 bg-gray-700 rounded-lg overflow-hidden border-2 border-white shadow-lg">
              <div className="w-full h-full flex items-center justify-center">
                <User className="h-10 w-10 text-gray-500" />
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            <div className="h-24 w-24 rounded-full overflow-hidden mb-4">
              <img
                src={appointmentDetails.doctor.image}
                alt={appointmentDetails.doctor.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="text-xl font-medium text-white mb-1">
              {appointmentDetails.doctor.name}
            </h2>
            <p className="text-gray-400 mb-6">{appointmentDetails.doctor.specialty}</p>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={handleConnect}
            >
              <Phone className="h-5 w-5 mr-2" />
              Start Call
            </Button>
          </div>
        )}
      </div>
      
      {/* Controls */}
      {isConnected && (
        <div className="p-4 bg-gray-800 flex items-center justify-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${isMuted ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            onClick={toggleMute}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className={`rounded-full ${isCameraOff ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-700 text-white hover:bg-gray-600'}`}
            onClick={toggleCamera}
          >
            {isCameraOff ? <VideoOff className="h-5 w-5" /> : <Video className="h-5 w-5" />}
          </Button>
          
          <Button
            variant="destructive"
            size="icon"
            className="rounded-full bg-red-500 hover:bg-red-600"
            onClick={handleEndCall}
          >
            <Phone className="h-5 w-5 rotate-135" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default VideoCall;
