
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const ScheduleAppointment: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isDoctor = user?.role === 'doctor';
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Sample doctors for patient to select
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=300&auto=format&fit=crop",
      selected: false
    },
    {
      id: 2,
      name: "Dr. Michael Brown",
      specialty: "Dermatologist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=300&auto=format&fit=crop",
      selected: false
    }
  ];
  
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  
  // Available time slots
  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
    "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
  ];
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDoctor && (!selectedDate || !selectedTime)) {
      toast({
        title: "Error",
        description: "Please select date and time for your availability",
        variant: "destructive",
      });
      return;
    }
    
    if (!isDoctor && (!selectedDoctor || !selectedDate || !selectedTime)) {
      toast({
        title: "Error",
        description: "Please select a doctor, date, and time",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: isDoctor ? "Availability added" : "Appointment scheduled",
        description: isDoctor 
          ? "Your availability has been added to the calendar" 
          : "Your appointment has been scheduled successfully",
      });
      setIsSubmitting(false);
      navigate('/appointments');
    }, 1000);
  };
  
  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)}
          className="mr-4"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-xl font-semibold">
          {isDoctor ? 'Add Availability' : 'Schedule Appointment'}
        </h1>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isDoctor && (
          <div>
            <h2 className="text-lg font-medium mb-3">Select Doctor</h2>
            <div className="space-y-3">
              {doctors.map(doctor => (
                <div 
                  key={doctor.id}
                  className={`medical-card flex items-center p-3 cursor-pointer transition-all ${
                    selectedDoctor === doctor.id 
                      ? 'border-medical-blue' 
                      : ''
                  }`}
                  onClick={() => setSelectedDoctor(doctor.id)}
                >
                  <div className="h-14 w-14 rounded-full overflow-hidden mr-3">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{doctor.name}</h3>
                    <p className="text-sm text-medical-darkGray">{doctor.specialty}</p>
                  </div>
                  <div className="ml-auto">
                    <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${
                      selectedDoctor === doctor.id 
                        ? 'border-medical-blue bg-medical-blue' 
                        : 'border-gray-300'
                    }`}>
                      {selectedDoctor === doctor.id && (
                        <div className="h-2 w-2 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        <div>
          <h2 className="text-lg font-medium mb-3">Select Date</h2>
          <div className="medical-card p-4">
            <input
              type="date"
              className="medical-input"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>
        </div>
        
        <div>
          <h2 className="text-lg font-medium mb-3">Select Time</h2>
          <div className="grid grid-cols-3 gap-3">
            {timeSlots.map((time, index) => (
              <div
                key={index}
                className={`py-2 px-3 rounded-xl text-center cursor-pointer transition-colors text-sm ${
                  selectedTime === time
                    ? 'bg-medical-blue text-white'
                    : 'bg-white border border-gray-200'
                }`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </div>
            ))}
          </div>
        </div>
        
        {!isDoctor && (
          <div>
            <h2 className="text-lg font-medium mb-3">Reason for Visit</h2>
            <textarea
              className="medical-input resize-none"
              placeholder="Briefly describe your reason for visit"
              rows={3}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        )}
        
        <Button 
          type="submit" 
          className="medical-button w-full h-12"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              {isDoctor ? 'Adding...' : 'Scheduling...'}
            </div>
          ) : (
            isDoctor ? 'Add Availability' : 'Schedule Appointment'
          )}
        </Button>
      </form>
    </div>
  );
};

export default ScheduleAppointment;
