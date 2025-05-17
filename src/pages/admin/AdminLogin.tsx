
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would be an API call to verify credentials
    setTimeout(() => {
      // For demo purposes, any login works
      console.log("Login attempt:", formData);
      
      // Mock successful login
      toast.success("Login successful", {
        description: "Welcome to the admin dashboard"
      });
      setIsLoading(false);
      navigate("/admin");
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center p-8">
        <div className="max-w-md mx-auto w-full">
          <div className="text-center mb-10">
            <Link to="/" className="inline-block text-2xl font-bold">
              Marathon<span className="text-marathon-orange">2025</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-6">Admin Login</h1>
            <p className="text-gray-600 mt-2">Sign in to manage the marathon event</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                  placeholder="admin@marathon2025.com"
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <a href="#" className="text-sm text-marathon-blue hover:text-marathon-darkBlue">
                    Forgot password?
                  </a>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-marathon-blue focus:ring-marathon-blue border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-marathon-blue hover:bg-marathon-darkBlue text-white py-2 rounded-md"
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-gray-600 hover:text-marathon-blue">
              Return to main website →
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Banner */}
      <div className="hidden md:block md:w-1/2 bg-marathon-darkBlue relative">
        <div className="absolute inset-0 bg-gradient-to-br from-marathon-blue to-marathon-darkBlue opacity-90"></div>
        <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">
          <h2 className="text-3xl font-bold mb-6">Marathon2025 Admin Portal</h2>
          <p className="text-xl mb-8">Manage your event, participants, and content all in one place.</p>
          <ul className="space-y-4">
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-marathon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Manage participant registrations
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-marathon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Update event content and photos
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-marathon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Track payments and verifications
            </li>
            <li className="flex items-center">
              <svg className="h-6 w-6 mr-2 text-marathon-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Manage staff accounts and permissions
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
