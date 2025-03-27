
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "../../contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("patient");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await register(name, email, password, role);
      toast({
        title: "Account created!",
        description: "You have successfully registered.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "An error occurred during registration.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="space-y-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-medical-black">Create Account</h1>
          <p className="text-medical-darkGray mt-2">Join our healthcare platform</p>
        </div>

        <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-6">
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`flex-1 py-3 text-center transition-all ${
              role === "patient"
                ? "bg-medical-blue text-white"
                : "bg-white text-gray-500"
            }`}
          >
            Patient
          </button>
          <button
            type="button"
            onClick={() => setRole("doctor")}
            className={`flex-1 py-3 text-center transition-all ${
              role === "doctor"
                ? "bg-medical-blue text-white"
                : "bg-white text-gray-500"
            }`}
          >
            Doctor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="medical-input"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="medical-input"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="medical-input"
              disabled={isSubmitting}
            />
          </div>

          <Button 
            type="submit" 
            className="medical-button w-full h-12"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating account...
              </div>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>

        <div className="text-center mt-6">
          <p className="text-medical-darkGray">
            Already have an account?{" "}
            <a href="/login" className="text-medical-blue font-medium hover:underline">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
