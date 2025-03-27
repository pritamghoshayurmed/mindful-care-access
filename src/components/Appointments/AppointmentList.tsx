
import React, { useState } from 'react';
import { Calendar, Clock, Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AppointmentList: React.FC = () => {
  const { user } = useAuth();
  const isDoctor = user?.role === 'doctor';
  
  // Upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      patientName: "John Smith",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "May 10, 2023",
      time: "10:30 AM",
      status: "confirmed",
      image: isDoctor 
        ? "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=300&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 2,
      patientName: "Emma Wilson",
      doctorName: "Dr. Michael Brown",
      specialty: "Dermatologist",
      date: "May 15, 2023",
      time: "2:00 PM",
      status: "pending",
      image: isDoctor 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
    }
  ];
  
  // Past appointments
  const pastAppointments = [
    {
      id: 3,
      patientName: "Robert Johnson",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "April 25, 2023",
      time: "11:00 AM",
      status: "completed",
      image: isDoctor 
        ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop"
    },
    {
      id: 4,
      patientName: "Sophia Garcia",
      doctorName: "Dr. Michael Brown",
      specialty: "Dermatologist",
      date: "April 18, 2023",
      time: "3:30 PM",
      status: "completed",
      image: isDoctor 
        ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop" 
        : "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop"
    }
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold">Appointments</h1>
        <Link to="/schedule-appointment">
          <button className="medical-button px-3 py-2 text-sm">
            {isDoctor ? 'Add Slot' : 'Book'}
          </button>
        </Link>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="space-y-3">
          {upcomingAppointments.map(appointment => (
            <Link key={appointment.id} to={`/appointments/${appointment.id}`}>
              <div className="medical-card">
                <div className="flex space-x-3">
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img
                      src={appointment.image}
                      alt={isDoctor ? appointment.patientName : appointment.doctorName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {isDoctor ? appointment.patientName : appointment.doctorName}
                    </h3>
                    {!isDoctor && (
                      <p className="text-sm text-medical-darkGray">{appointment.specialty}</p>
                    )}
                    <div className="flex space-x-4 mt-1">
                      <div className="flex items-center text-xs text-medical-darkGray">
                        <Calendar className="h-3 w-3 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-xs text-medical-darkGray">
                        <Clock className="h-3 w-3 mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      appointment.status === 'confirmed' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
                      {appointment.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </TabsContent>
        
        <TabsContent value="past" className="space-y-3">
          {pastAppointments.map(appointment => (
            <Link key={appointment.id} to={`/appointments/${appointment.id}`}>
              <div className="medical-card">
                <div className="flex space-x-3">
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img
                      src={appointment.image}
                      alt={isDoctor ? appointment.patientName : appointment.doctorName}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {isDoctor ? appointment.patientName : appointment.doctorName}
                    </h3>
                    {!isDoctor && (
                      <p className="text-sm text-medical-darkGray">{appointment.specialty}</p>
                    )}
                    <div className="flex space-x-4 mt-1">
                      <div className="flex items-center text-xs text-medical-darkGray">
                        <Calendar className="h-3 w-3 mr-1" />
                        {appointment.date}
                      </div>
                      <div className="flex items-center text-xs text-medical-darkGray">
                        <Clock className="h-3 w-3 mr-1" />
                        {appointment.time}
                      </div>
                    </div>
                  </div>
                  <div>
                    <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                      Completed
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AppointmentList;
