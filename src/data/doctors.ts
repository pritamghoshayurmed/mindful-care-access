
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  description: string;
  address: string;
  image?: string;
}

export const doctors: Doctor[] = [
  // Cardiology
  {
    id: 1,
    name: "Dr. Rajesh Kumar Sharma",
    specialty: "Cardiologist",
    description: "Senior Interventional Cardiologist with 20 years of experience",
    address: "Apollo Hospital, Sector 26, Noida, Uttar Pradesh",
    image: `https://ui-avatars.com/api/?name=Rajesh+Kumar+Sharma&background=16A34A&color=fff`
  },
  {
    id: 2,
    name: "Dr. Priya Nair",
    specialty: "Cardiologist",
    description: "Expert in preventive cardiology and heart health",
    address: "Fortis Hospital, Mulund, Mumbai, Maharashtra",
    image: `https://ui-avatars.com/api/?name=Priya+Nair&background=16A34A&color=fff`
  },
  // Dermatology
  {
    id: 3,
    name: "Dr. Amit Gupta",
    specialty: "Dermatologist",
    description: "Specialized in cosmetic dermatology and skin treatments",
    address: "Max Hospital, Saket, New Delhi",
    image: `https://ui-avatars.com/api/?name=Amit+Gupta&background=16A34A&color=fff`
  },
  {
    id: 4,
    name: "Dr. Sneha Deshmukh",
    specialty: "Dermatologist",
    description: "Leading expert in acne and skin rejuvenation treatments",
    address: "Ruby Hall Clinic, Pune, Maharashtra",
    image: `https://ui-avatars.com/api/?name=Sneha+Deshmukh&background=16A34A&color=fff`
  },
  // Neurology
  {
    id: 5,
    name: "Dr. Vikram Reddy",
    specialty: "Neurologist",
    description: "Renowned for treatment of complex neurological disorders",
    address: "CARE Hospitals, Hyderabad, Telangana",
    image: `https://ui-avatars.com/api/?name=Vikram+Reddy&background=16A34A&color=fff`
  },
  {
    id: 6,
    name: "Dr. Anjali Mehta",
    specialty: "Neurologist",
    description: "Specialist in stroke and neurodegenerative diseases",
    address: "Kokilaben Hospital, Mumbai, Maharashtra",
    image: `https://ui-avatars.com/api/?name=Anjali+Mehta&background=16A34A&color=fff`
  },
  // Orthopedics
  {
    id: 7,
    name: "Dr. Rahul Malhotra",
    specialty: "Orthopedic Surgeon",
    description: "Expert in joint replacement and sports injuries",
    address: "Medanta Hospital, Gurugram, Haryana",
    image: `https://ui-avatars.com/api/?name=Rahul+Malhotra&background=16A34A&color=fff`
  },
  {
    id: 8,
    name: "Dr. Deepa Krishnamurthy",
    specialty: "Orthopedic Surgeon",
    description: "Specializes in spine and trauma surgeries",
    address: "Manipal Hospital, Bangalore, Karnataka",
    image: `https://ui-avatars.com/api/?name=Deepa+Krishnamurthy&background=16A34A&color=fff`
  },
  // Pediatrics
  {
    id: 9,
    name: "Dr. Sanjay Patel",
    specialty: "Pediatrician",
    description: "Child health specialist with 25 years of experience",
    address: "Sterling Hospital, Ahmedabad, Gujarat",
    image: `https://ui-avatars.com/api/?name=Sanjay+Patel&background=16A34A&color=fff`
  },
  {
    id: 10,
    name: "Dr. Kavita Iyer",
    specialty: "Pediatrician",
    description: "Expert in child nutrition and developmental pediatrics",
    address: "Cloudnine Hospital, Chennai, Tamil Nadu",
    image: `https://ui-avatars.com/api/?name=Kavita+Iyer&background=16A34A&color=fff`
  },
  // Psychiatry
  {
    id: 11,
    name: "Dr. Arun Chopra",
    specialty: "Psychiatrist",
    description: "Leading mental health expert specializing in anxiety and depression",
    address: "Artemis Hospital, Gurgaon, Haryana",
    image: `https://ui-avatars.com/api/?name=Arun+Chopra&background=16A34A&color=fff`
  },
  {
    id: 12,
    name: "Dr. Shruti Bhat",
    specialty: "Psychiatrist",
    description: "Renowned for holistic mental health treatment",
    address: "Jaslok Hospital, Mumbai, Maharashtra",
    image: `https://ui-avatars.com/api/?name=Shruti+Bhat&background=16A34A&color=fff`
  },
  // ENT
  {
    id: 13,
    name: "Dr. Vishal Jain",
    specialty: "ENT Specialist",
    description: "Expert in advanced ENT surgical procedures",
    address: "Narayana Multispecialty Hospital, Bangalore, Karnataka",
    image: `https://ui-avatars.com/api/?name=Vishal+Jain&background=16A34A&color=fff`
  },
  {
    id: 14,
    name: "Dr. Neha Sharma",
    specialty: "ENT Specialist",
    description: "Specializes in complex ear and sinus surgeries",
    address: "Apollo Hospitals, Chennai, Tamil Nadu",
    image: `https://ui-avatars.com/api/?name=Neha+Sharma&background=16A34A&color=fff`
  },
  // Gynecology
  {
    id: 15,
    name: "Dr. Aarti Goyal",
    specialty: "Gynecologist",
    description: "Leading expert in women's reproductive health",
    address: "Fortis Hospital, Mohali, Punjab",
    image: `https://ui-avatars.com/api/?name=Aarti+Goyal&background=16A34A&color=fff`
  },
  {
    id: 16,
    name: "Dr. Rohan Desai",
    specialty: "Gynecologist",
    description: "Specialist in high-risk pregnancy management",
    address: "Breach Candy Hospital, Mumbai, Maharashtra",
    image: `https://ui-avatars.com/api/?name=Rohan+Desai&background=16A34A&color=fff`
  }
];

export const specialties = [
  "Cardiologist", 
  "Dermatologist", 
  "Neurologist", 
  "Orthopedic", 
  "Pediatrician",
  "Psychiatrist",
  "ENT Specialist",
  "Gynecologist"
];
