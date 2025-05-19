
import { useState, useEffect } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { toast } from "sonner";
import { supabase, sendEmail } from "@/integrations/supabase/client";
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    tshirtSize: "M",
    packageId: searchParams.get("package") || "1",
    distance: searchParams.get("distance") || "5k",
    paymentProof: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrationId, setRegistrationId] = useState(null);
  const [verificationCode, setVerificationCode] = useState(null);

  const distances = [
    { id: "5k", name: "5K Fun Run", additionalPrice: 0 },
    { id: "10k", name: "10K Race", additionalPrice: 10 },
    { id: "half", name: "Half Marathon", additionalPrice: 25 },
    { id: "full", name: "Full Marathon", additionalPrice: 40 }
  ];

  const tShirtSizes = ["XS", "S", "M", "L", "XL", "XXL"];
  
  // Fetch packages from Supabase
  useEffect(() => {
    async function fetchPackages() {
      try {
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) throw error;
        if (data) setPackages(data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast.error('Failed to load packages. Please try again.');
      }
    }
    
    fetchPackages();
  }, []);

  useEffect(() => {
    // Set package and distance from URL params if they exist
    if (searchParams.get("package")) {
      setFormData(prev => ({
        ...prev,
        packageId: searchParams.get("package"),
        distance: searchParams.get("distance") || "5k"
      }));
    }
  }, [searchParams]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ 
      ...prev, 
      paymentProof: e.target.files[0] 
    }));
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Generate a unique verification code
  const generateVerificationCode = () => {
    // Create a unique code that's easy to read (alphanumeric, no special chars)
    // Format: CSR-XXXX-XXXX where X is alphanumeric
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Omitting confusing characters like 0, O, 1, I
    let code = 'CSR-';
    
    // Generate first group of 4 characters
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    code += '-';
    
    // Generate second group of 4 characters
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return code;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const generatedId = uuidv4();
    const verificationCode = generateVerificationCode();
    
    try {
      // First create the user record
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert({
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          tshirt_size: formData.tshirtSize
        })
        .select()
        .single();

      if (userError) throw userError;

      // Upload payment proof if it exists
      let paymentProofUrl = '';
      
      if (formData.paymentProof) {
        const fileExt = formData.paymentProof.name.split('.').pop();
        const fileName = `${userData.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
        
        const { data: fileData, error: uploadError } = await supabase.storage
          .from('payment_proofs')
          .upload(fileName, formData.paymentProof);

        if (uploadError) throw uploadError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('payment_proofs')
          .getPublicUrl(fileName);
          
        paymentProofUrl = publicUrl;
      }

      // Calculate amount based on selected package and distance
      const selectedPackage = packages.find(p => p.id.toString() === formData.packageId.toString());
      const selectedDistance = distances.find(d => d.id === formData.distance);
      const totalAmount = selectedPackage ? selectedPackage.price + (selectedDistance?.additionalPrice || 0) : 0;

      // Then create the registration record with the verification code
      const { data: regData, error: regError } = await supabase
        .from('registrations')
        .insert({
          user_id: userData.id,
          package_id: parseInt(formData.packageId),
          distance: formData.distance,
          status: 'pending',
          payment_proof: paymentProofUrl,
          amount: totalAmount,
          email: formData.email,
          verification_code: verificationCode
        })
        .select()
        .single();

      if (regError) throw regError;
      
      // Store the registration ID and verification code for the confirmation page
      setRegistrationId(regData.id);
      setVerificationCode(verificationCode);
      
      // Send welcome email to the user
      try {
        const selectedPackage = packages.find(p => p.id.toString() === formData.packageId.toString());
        await sendEmail.welcome(formData.fullName, formData.email, {
          package: selectedPackage?.name || 'Standard Package',
          distance: selectedDistance?.name || 'Standard Distance',
          tshirtSize: formData.tshirtSize,
          verificationCode: verificationCode
        });
      } catch (emailError) {
        console.error('Welcome email could not be sent:', emailError);
        // Don't fail the registration if email fails
      }
      
      // Move to the confirmation step
      setStep(4);

      toast.success("Registration successful!", {
        description: "We'll review your registration and get back to you soon.",
      });
      
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Registration failed", {
        description: "Please try again or contact support if the problem persists.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedPackage = packages.find(p => p.id.toString() === formData.packageId.toString());
  const selectedDistance = distances.find(d => d.id === formData.distance);
  const totalPrice = selectedPackage ? selectedPackage.price + (selectedDistance?.additionalPrice || 0) : 0;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-marathon-blue p-6 text-white">
              <h1 className="text-2xl md:text-3xl font-bold">Register for Color Splash Run</h1>
              <p className="mt-2">Complete your registration to secure your spot in the event</p>

              {/* Progress Indicator */}
              <div className="mt-6">
                <div className="flex items-center">
                  {[1, 2, 3, 4].map((stepNumber) => (
                    <div key={stepNumber} className="flex-1 relative">
                      <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto ${
                          stepNumber <= step 
                            ? "bg-white text-marathon-blue" 
                            : "bg-white/30 text-white"
                        }`}
                      >
                        {stepNumber}
                      </div>
                      <div className="text-xs text-center mt-2 text-white">
                        {stepNumber === 1 && "Personal Info"}
                        {stepNumber === 2 && "Select Package"}
                        {stepNumber === 3 && "Payment"}
                        {stepNumber === 4 && "Confirmation"}
                      </div>
                      {stepNumber < 4 && (
                        <div 
                          className={`h-1 absolute top-5 left-1/2 w-full ${
                            stepNumber < step ? "bg-white" : "bg-white/30"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Step 1: Personal Information */}
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-marathon-darkBlue mb-6">Personal Information</h2>
                  <form>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="fullName"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Phone Number*
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        />
                      </div>
                      <div>
                        <label htmlFor="tshirtSize" className="block text-sm font-medium text-gray-700 mb-1">
                          T-Shirt Size*
                        </label>
                        <select
                          id="tshirtSize"
                          name="tshirtSize"
                          value={formData.tshirtSize}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        >
                          {tShirtSizes.map(size => (
                            <option key={size} value={size}>
                              {size}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Address*
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                          City*
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        />
                      </div>
                      <div>
                        <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province*
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        />
                      </div>
                      <div>
                        <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                          Zip/Postal Code*
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          Country*
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-marathon-blue"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-8 flex justify-end">
                      <Button
                        onClick={nextStep}
                        className="button-primary"
                      >
                        Next: Choose Package
                      </Button>
                    </div>
                  </form>
                </div>
              )}

              {/* Step 2: Package Selection */}
              {step === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-marathon-darkBlue mb-6">Select Your Package</h2>
                  
                  {/* Package Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-marathon-darkBlue mb-3">Marathon Package</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {packages.map(pkg => (
                        <label
                          key={pkg.id}
                          htmlFor={`package-${pkg.id}`}
                          className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.packageId.toString() === pkg.id.toString()
                              ? "border-marathon-blue bg-marathon-blue/5 ring-2 ring-marathon-blue"
                              : "border-gray-200 hover:border-marathon-blue"
                          }`}
                        >
                          <input
                            type="radio"
                            id={`package-${pkg.id}`}
                            name="packageId"
                            value={pkg.id}
                            checked={formData.packageId.toString() === pkg.id.toString()}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="font-medium text-lg mb-1">{pkg.name}</div>
                          <div className="text-2xl font-bold text-marathon-blue">${pkg.price}</div>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Distance Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-marathon-darkBlue mb-3">Race Distance</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      {distances.map(distance => (
                        <label
                          key={distance.id}
                          htmlFor={`distance-${distance.id}`}
                          className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.distance === distance.id
                              ? "border-marathon-blue bg-marathon-blue/5 ring-2 ring-marathon-blue"
                              : "border-gray-200 hover:border-marathon-blue"
                          }`}
                        >
                          <input
                            type="radio"
                            id={`distance-${distance.id}`}
                            name="distance"
                            value={distance.id}
                            checked={formData.distance === distance.id}
                            onChange={handleChange}
                            className="sr-only"
                          />
                          <div className="font-medium">{distance.name}</div>
                          {distance.additionalPrice > 0 && (
                            <div className="text-sm text-gray-600">+${distance.additionalPrice}</div>
                          )}
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Total Price */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-8">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium">Total Price:</div>
                        <div className="text-sm text-gray-600">
                          {selectedPackage?.name} + {selectedDistance?.name}
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-marathon-blue">
                        ${totalPrice}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="border-marathon-blue text-marathon-blue hover:bg-marathon-blue/5"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={nextStep}
                      className="button-primary"
                    >
                      Next: Payment
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {step === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-marathon-darkBlue mb-6">Payment Details</h2>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          For this demo, you'll upload a screenshot of payment instead of using a real payment gateway.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Summary */}
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-marathon-darkBlue mb-4">Order Summary</h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package:</span>
                        <span>{selectedPackage?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Distance:</span>
                        <span>{selectedDistance?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">T-Shirt Size:</span>
                        <span>{formData.tshirtSize}</span>
                      </div>
                      <div className="border-t border-gray-200 my-2"></div>
                      <div className="flex justify-between font-bold">
                        <span>Total:</span>
                        <span>${totalPrice}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Payment Instructions */}
                  <div className="mb-6">
                    <h3 className="font-medium text-marathon-darkBlue mb-2">Payment Instructions</h3>
                    <p className="text-gray-600 mb-4">
                      Please make a payment to the following account and upload a screenshot of your payment receipt:
                    </p>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Bank Name</div>
                          <div className="font-medium">Marathon Bank</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Account Name</div>
                          <div className="font-medium">Marathon2025 Events Inc.</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Account Number</div>
                          <div className="font-medium">123456789</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Reference</div>
                          <div className="font-medium">M2025-{formData.fullName || "YOUR-NAME"}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Upload Payment Proof */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Payment Proof*
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <input
                        type="file"
                        id="paymentProof"
                        name="paymentProof"
                        onChange={handleFileChange}
                        required
                        className="sr-only"
                        accept="image/*"
                      />
                      <label htmlFor="paymentProof" className="cursor-pointer">
                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="mt-1 text-sm text-gray-600">
                          {formData.paymentProof 
                            ? formData.paymentProof.name
                            : "Click to upload a screenshot of your payment"
                          }
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      className="border-marathon-blue text-marathon-blue hover:bg-marathon-blue/5"
                    >
                      Back
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isSubmitting || !formData.paymentProof}
                      className="bg-marathon-orange hover:bg-orange-600 text-white"
                    >
                      {isSubmitting ? "Processing..." : "Complete Registration"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Confirmation */}
              {step === 4 && (
                <div className="text-center py-8">
                  <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                    <svg className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-marathon-darkBlue mb-4">Registration Successful!</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for registering for the Color Splash Run. Your registration has been received
                    and is pending approval.
                  </p>
                  
                  <div className="bg-gray-50 rounded-lg p-6 mb-6 inline-block">
                    <p className="text-gray-600 mb-2">Your Registration ID:</p>
                    <p className="text-xl font-bold text-marathon-blue">{registrationId?.substring(0, 8) || "Registration Complete"}</p>
                    
                    {verificationCode && (
                      <>
                        <p className="text-gray-600 mt-4 mb-2">Your Verification Code:</p>
                        <p className="text-3xl font-bold text-marathon-blue tracking-wider">{verificationCode}</p>
                        <p className="text-sm text-gray-500 mt-2">Keep this code safe. You'll need it on event day.</p>
                      </>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-8">
                    We have sent a confirmation email to {formData.email} with all the details.
                    Please keep your verification code for future reference.
                  </p>
                  
                  <div className="space-y-4">
                    <Link to="/">
                      <Button className="button-primary">
                        Return to Homepage
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
