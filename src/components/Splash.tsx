
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PlusIcon } from "lucide-react";

const Splash: React.FC = () => {
  const navigate = useNavigate();
  const [showPlusIcon, setShowPlusIcon] = useState(false);

  useEffect(() => {
    // Show the plus icon with delay for animation
    setTimeout(() => {
      setShowPlusIcon(true);
    }, 500);

    // Navigate to welcome screen after 2.5 seconds
    const timer = setTimeout(() => {
      navigate("/welcome");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-medical-blue">
      <div className="relative animate-scale-up flex items-center justify-center h-20 w-20 rounded-2xl bg-white">
        {showPlusIcon && (
          <PlusIcon
            className="text-medical-blue animate-fade-in"
            size={32}
            strokeWidth={2.5}
          />
        )}
      </div>
    </div>
  );
};

export default Splash;
