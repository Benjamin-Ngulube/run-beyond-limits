
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Packages = () => {
  const [loading, setLoading] = useState(true);

  // Static packages data for Color Splash Run
  const colorSplashPackages = [
    {
      id: 1,
      name: "Family Package",
      price: 1000,
      forPeople: 4,
      features: [
        "Entry tickets for 4 participants",
        "4 color powder packs",
        "4 event T-shirts",
        "4 finisher sunglasses",
        "Access to post-run refreshments"
      ],
      recommended: false,
      note: "Perfect for families looking for a fun, active day out!"
    },
    {
      id: 2,
      name: "Corporate Package",
      price: 300,
      forPeople: 1,
      features: [
        "Entry ticket per participant",
        "1 color powder pack",
        "1 event T-shirt",
        "Sunglasses",
        "Team-building opportunities",
        "Customizable group branding (for teams of 10+)"
      ],
      recommended: true,
      note: "Discounts available for groups of 20+ (contact organizers)"
    },
    {
      id: 3,
      name: "Student Package",
      price: 250,
      forPeople: 1,
      features: [
        "Entry ticket",
        "1 color powder pack",
        "1 event T-shirt",
        "Sunglasses",
        "Access to student-only refreshment zones"
      ],
      recommended: false,
      note: "Valid student ID must be presented at registration"
    },
    {
      id: 4,
      name: "Learning Institution Package",
      price: 300,
      forPeople: 1,
      features: [
        "Entry ticket per participant",
        "1 color powder pack",
        "1 event T-shirt",
        "Sunglasses",
        "Certificate of participation for schools/universities"
      ],
      recommended: false,
      note: "Ideal for field trips, sports clubs, or university teams"
    },
    {
      id: 5,
      name: "Individual Package",
      price: 300,
      forPeople: 1,
      features: [
        "Entry ticket",
        "1 color powder pack",
        "1 event T-shirt",
        "Sunglasses"
      ],
      recommended: false
    },
    {
      id: 6,
      name: "Early Bird Special",
      price: 1000,
      forPeople: 4,
      features: [
        "Entry tickets for 4 participants",
        "4 color powder packs",
        "4 event T-shirts",
        "4 Sunglasses",
        "Early Bird Special"
      ],
      recommended: false,
      note: "Limited Time Offer: Register before 23rd May 2025 to secure this deal!"
    }
  ];

  // Fetch packages from Supabase or use static packages
  useEffect(() => {
    async function updatePackages() {
      try {
        setLoading(true);
        
        // First check if packages already exist
        const { data: existingPackages } = await supabase
          .from('packages')
          .select('*');
          
        // If packages don't exist or there aren't enough, update them
        if (!existingPackages || existingPackages.length < colorSplashPackages.length) {
          // Delete existing packages first
          await supabase.from('packages').delete().gte('id', 0);
          
          // Insert new packages
          for (const pkg of colorSplashPackages) {
            await supabase.from('packages').insert({
              id: pkg.id,
              name: pkg.name,
              price: pkg.price,
              features: JSON.stringify(pkg.features)
            });
          }
        }
        
        // Fetch updated packages
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) throw error;
        
      } catch (error) {
        console.error('Error handling packages:', error);
        toast({
          title: "Error with packages",
          description: "Using default packages instead",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    }
    
    updatePackages();
  }, []);

  return (
    <section id="packages" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-marathon-darkBlue mb-4">Choose Your Package</h2>
          <div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select from our range of Color Splash Run packages designed to enhance your
            running experience with different levels of perks and benefits.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center">
              <svg className="animate-spin h-8 w-8 text-marathon-blue mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Loading packages...</span>
            </div>
          </div>
        ) : (
          /* Packages Display */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {colorSplashPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden ${
                  pkg.recommended ? "border-2 border-marathon-orange ring-2 ring-marathon-orange/20" : "border border-gray-200"
                }`}
              >
                {pkg.recommended && (
                  <div className="bg-marathon-orange text-white text-center py-2 font-medium">
                    RECOMMENDED
                  </div>
                )}
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-marathon-darkBlue mb-2">{pkg.name}</h3>
                  <div className="flex items-baseline mb-2">
                    <span className="text-4xl font-bold text-marathon-blue">
                      K{Number(pkg.price)}
                    </span>
                    {pkg.forPeople > 1 && (
                      <span className="text-gray-500 ml-1">/{pkg.forPeople} people</span>
                    )}
                    {pkg.forPeople === 1 && (
                      <span className="text-gray-500 ml-1">/person</span>
                    )}
                  </div>
                  
                  {pkg.note && (
                    <p className="text-sm text-gray-600 italic mb-4">{pkg.note}</p>
                  )}
                  
                  <ul className="mb-6 space-y-3">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-gray-600">
                        <svg className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link to={`/register?package=${pkg.id}`}>
                    <Button className={`w-full ${pkg.recommended ? "button-accent" : "button-primary"}`}>
                      Select Package
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 py-6 px-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-marathon-darkBlue mb-4">Terms & Conditions</h3>
          <ul className="text-gray-600 space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-marathon-blue mr-2">•</span>
              All prices are non-refundable.
            </li>
            <li className="flex items-start">
              <span className="text-marathon-blue mr-2">•</span>
              T-shirt sizes subject to availability (please indicate the shirt size when registering).
            </li>
            <li className="flex items-start">
              <span className="text-marathon-blue mr-2">•</span>
              Early bird registrations close on 23rd May 2025.
            </li>
            <li className="flex items-start">
              <span className="text-marathon-blue mr-2">•</span>
              Group discounts require advance payment.
            </li>
          </ul>
          
          <h3 className="text-lg font-bold text-marathon-darkBlue mb-2">How to Register</h3>
          <p className="italic text-gray-500 mb-4">Opening soon</p>
          <ul className="text-gray-600 space-y-2">
            <li className="flex items-start">
              <span className="text-marathon-blue mr-2">•</span>
              Online: Visit <a href="https://www.malaikashevents.com/register" className="text-marathon-blue hover:underline">www.malaikashevents.com/register</a>
            </li>
            <li className="flex items-start">
              <span className="text-marathon-blue mr-2">•</span>
              In-Person: Visit our registration agents at Mukuba Mall, Nkana Mall and ECL Mall, or at any offices of our sponsors.
            </li>
            <li className="flex items-start">
              <span className="text-marathon-blue mr-2">•</span>
              Contact: Email <a href="mailto:malaikashevents@gmail.com" className="text-marathon-blue hover:underline">malaikashevents@gmail.com</a> or call +26 0968 608888
            </li>
          </ul>
        </div>
        
        <div className="mt-8 text-center text-gray-500">
          <p>Join us for a vibrant day of fun, fitness, and color! 🏃‍♀️🏃‍♂️🎨</p>
        </div>
      </div>
    </section>
  );
};

export default Packages;
