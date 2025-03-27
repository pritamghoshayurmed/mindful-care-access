
import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon, ArrowRight, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-4 animate-fade-in">
        <div className="flex items-center justify-center h-20 w-20 rounded-2xl bg-medical-blue mb-12">
          <PlusIcon className="text-white" size={32} strokeWidth={2.5} />
        </div>

        <h1 className="text-3xl font-semibold text-center text-medical-black mb-4">
          Welcome to MindfulCare
        </h1>
        
        <p className="text-center text-gray-500 max-w-xs mb-12">
          Connect with healthcare professionals and manage your medical needs from anywhere
        </p>

        <div className="w-full max-w-xs space-y-4">
          <Button 
            className="medical-button w-full h-12"
            onClick={() => navigate("/login")}
          >
            Sign In
            <ArrowRight size={18} className="ml-2" />
          </Button>
          
          <Button 
            variant="outline" 
            className="medical-button-outline w-full h-12"
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>

          <Button 
            variant="ghost" 
            className="w-full h-12 flex items-center justify-center gap-2 text-medical-blue"
            onClick={() => navigate("/ai-chat")}
          >
            <MessageSquareText size={18} />
            AI Health Assistant
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
