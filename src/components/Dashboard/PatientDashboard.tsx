
import React from "react";
import { Calendar, Clock, User, Users, MessageSquare, Bell } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const PatientDashboard: React.FC = () => {
  const { user } = useAuth();
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(currentDate);

  // Mock upcoming appointment
  const upcomingAppointment = {
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "Tomorrow",
    time: "10:30 AM",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-medical-black">
            Hello, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-medical-darkGray text-sm">{formattedDate}</p>
        </div>
        <Link to="/profile">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-medical-blue">
            <img 
              src={user?.profilePicture || "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop"} 
              alt={user?.name || "User"}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-4">
        <Link to="/appointments" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <Calendar className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Appointments</span>
        </Link>
        <Link to="/doctors" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <Users className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Doctors</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <MessageSquare className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Messages</span>
        </Link>
        <Link to="/notifications" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <Bell className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Notifications</span>
        </Link>
      </div>

      {/* Upcoming appointment */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Upcoming Appointment</h2>
        <div className="medical-card p-4 flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full overflow-hidden">
            <img 
              src={upcomingAppointment.image} 
              alt={upcomingAppointment.doctor}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{upcomingAppointment.doctor}</h3>
            <p className="text-sm text-medical-darkGray">{upcomingAppointment.specialty}</p>
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center text-xs text-medical-darkGray">
                <Calendar className="h-3 w-3 mr-1" />
                {upcomingAppointment.date}
              </div>
              <div className="flex items-center text-xs text-medical-darkGray">
                <Clock className="h-3 w-3 mr-1" />
                {upcomingAppointment.time}
              </div>
            </div>
          </div>
          <Link to="/appointments/1">
            <button className="h-10 w-10 rounded-xl bg-medical-lightBlue flex items-center justify-center">
              <ArrowRight className="h-5 w-5 text-medical-blue" />
            </button>
          </Link>
        </div>
      </div>

      {/* Health tips */}
      <div>
        <h2 className="font-semibold text-lg mb-3">Health Tips</h2>
        <div className="space-y-3">
          <div className="p-4 rounded-xl bg-medical-lightBlue">
            <h3 className="font-medium text-medical-blue mb-1">Stay Hydrated</h3>
            <p className="text-sm text-gray-700">Remember to drink at least 8 glasses of water daily for optimal health.</p>
          </div>
          <div className="p-4 rounded-xl bg-medical-lightBlue">
            <h3 className="font-medium text-medical-blue mb-1">Regular Exercise</h3>
            <p className="text-sm text-gray-700">Aim for at least 30 minutes of moderate exercise 5 days a week.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
