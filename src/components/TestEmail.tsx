
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { sendEmail } from "@/integrations/supabase/client";

const TestEmail = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorDetails, setErrorDetails] = useState<string | null>(null);

  const sendTestWelcomeEmail = async () => {
    if (!name || !email) {
      toast.error("Please enter both name and email");
      return;
    }

    setLoading(true);
    setErrorDetails(null);
    try {
      const response = await sendEmail.welcome(name, email, {
        package: 'Family Package',
        distance: '5K Fun Run',
        tshirtSize: 'M'
      });
      console.log("Email API response:", response);
      toast.success("Welcome email sent successfully!");
    } catch (error) {
      console.error("Error sending welcome email:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrorDetails(errorMessage);
      toast.error("Failed to send welcome email");
    } finally {
      setLoading(false);
    }
  };

  const sendTestVerificationEmail = async () => {
    if (!name || !email) {
      toast.error("Please enter both name and email");
      return;
    }

    setLoading(true);
    setErrorDetails(null);
    try {
      const response = await sendEmail.verification(name, email);
      console.log("Email API response:", response);
      toast.success("Verification email sent successfully!");
    } catch (error) {
      console.error("Error sending verification email:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrorDetails(errorMessage);
      toast.error("Failed to send verification email");
    } finally {
      setLoading(false);
    }
  };

  const sendTestEmail = async () => {
    if (!name || !email) {
      toast.error("Please enter both name and email");
      return;
    }

    setLoading(true);
    setErrorDetails(null);
    try {
      const response = await sendEmail.test(name, email);
      console.log("Email API response:", response);
      toast.success("Test email sent successfully!");
    } catch (error) {
      console.error("Error sending test email:", error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      setErrorDetails(errorMessage);
      toast.error("Failed to send test email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Test Email System</h2>
      <p className="text-gray-600 mb-4">Use this form to test the email functionality.</p>
      
      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input 
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <Button 
          onClick={sendTestEmail}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Sending..." : "Send Test Email"}
        </Button>
        <Button 
          onClick={sendTestWelcomeEmail}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700"
        >
          {loading ? "Sending..." : "Test Welcome Email"}
        </Button>
        <Button 
          onClick={sendTestVerificationEmail}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {loading ? "Sending..." : "Test Verification Email"}
        </Button>
      </div>
      
      {errorDetails && (
        <div className="mt-4 p-3 bg-red-50 border border-red-100 rounded text-red-700">
          <p className="font-semibold">Error Details:</p>
          <pre className="text-xs mt-1 overflow-x-auto">{errorDetails}</pre>
        </div>
      )}
    </div>
  );
};

export default TestEmail;
