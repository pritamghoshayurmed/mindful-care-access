
import React from "react";
import { Calendar, Clock, User, Clipboard, MessageSquare, Bell, ArrowRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

const DoctorDashboard: React.FC = () => {
  const { profile } = useAuth();
  const currentDate = new Date();
  const formattedDate = new Intl.DateTimeFormat('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  }).format(currentDate);

  // Mock upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patient: "John Smith",
      time: "10:30 AM",
      reason: "Annual Checkup",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      patient: "Emma Wilson",
      time: "11:45 AM",
      reason: "Follow-up",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-semibold text-medical-black">
            Hello, Dr. {profile?.full_name?.split(' ')[1] || 'Doctor'}
          </h1>
          <p className="text-medical-darkGray text-sm">{formattedDate}</p>
        </div>
        <Link to="/profile">
          <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-medical-blue">
            <img 
              src={profile?.profile_picture || "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"} 
              alt={profile?.full_name || "Doctor"}
              className="h-full w-full object-cover"
            />
          </div>
        </Link>
      </div>

      {/* Stats overview */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-medical-blue rounded-xl p-3 text-white">
          <h3 className="text-xs font-medium mb-1">Appointments</h3>
          <p className="text-2xl font-semibold">8</p>
          <p className="text-xs opacity-80">Today</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <h3 className="text-xs font-medium text-medical-darkGray mb-1">Patients</h3>
          <p className="text-2xl font-semibold text-medical-black">24</p>
          <p className="text-xs text-medical-darkGray">Total</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100">
          <h3 className="text-xs font-medium text-medical-darkGray mb-1">Messages</h3>
          <p className="text-2xl font-semibold text-medical-black">5</p>
          <p className="text-xs text-medical-darkGray">Unread</p>
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-4 gap-4">
        <Link to="/appointments" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <Calendar className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Schedule</span>
        </Link>
        <Link to="/patients" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <User className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Patients</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <MessageSquare className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Messages</span>
        </Link>
        <Link to="/records" className="flex flex-col items-center">
          <div className="h-14 w-14 rounded-xl bg-medical-lightBlue flex items-center justify-center mb-2">
            <Clipboard className="h-6 w-6 text-medical-blue" />
          </div>
          <span className="text-xs text-medical-darkGray text-center">Records</span>
        </Link>
      </div>

      {/* Today's appointments */}
      <div>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-lg">Today's Patients</h2>
          <Link to="/appointments" className="text-sm text-medical-blue">View all</Link>
        </div>
        <div className="space-y-3">
          {upcomingAppointments.map(appointment => (
            <div key={appointment.id} className="medical-card p-4 flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full overflow-hidden">
                <img 
                  src={appointment.image} 
                  alt={appointment.patient}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{appointment.patient}</h3>
                <p className="text-sm text-medical-darkGray">{appointment.reason}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center text-xs text-medical-darkGray">
                    <Clock className="h-3 w-3 mr-1" />
                    {appointment.time}
                  </div>
                </div>
              </div>
              <Link to={`/appointments/${appointment.id}`}>
                <button className="h-10 w-10 rounded-xl bg-medical-lightBlue flex items-center justify-center">
                  <ArrowRight className="h-5 w-5 text-medical-blue" />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
