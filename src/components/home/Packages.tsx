
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const Packages = () => {
  const [selectedDistance, setSelectedDistance] = useState("5k");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const distances = [
    { id: "5k", name: "5K Fun Run", additionalPrice: 0 },
    { id: "10k", name: "10K Race", additionalPrice: 10 },
    { id: "half", name: "Half Marathon", additionalPrice: 25 },
    { id: "full", name: "Full Marathon", additionalPrice: 40 }
  ];

  // Fetch packages from Supabase
  useEffect(() => {
    async function fetchPackages() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('packages')
          .select('*')
          .order('id', { ascending: true });
          
        if (error) throw error;
        
        if (data) {
          // Format packages with recommended flag
          const formattedPackages = data.map((pkg, index) => ({
            ...pkg,
            features: Array.isArray(pkg.features) ? pkg.features : JSON.parse(pkg.features || '[]'),
            recommended: index === 1 // Middle package is recommended
          }));
          
          setPackages(formattedPackages);
        }
      } catch (error) {
        console.error('Error fetching packages:', error);
        toast({
          title: "Failed to load packages",
          description: "Please try refreshing the page",
          variant: "destructive"
        });
        // Fallback to empty array
        setPackages([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPackages();
  }, []);

  function getCurrentDistanceAdditionalPrice() {
    const distance = distances.find(d => d.id === selectedDistance);
    return distance ? distance.additionalPrice : 0;
  }

  return (
    <section id="packages" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-marathon-darkBlue mb-4">Choose Your Package</h2>
          <div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Select from our range of marathon packages designed to enhance your
            running experience with different levels of perks and benefits.
          </p>
        </div>

        {/* Distance Selection */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {distances.map((distance) => (
            <button
              key={distance.id}
              onClick={() => setSelectedDistance(distance.id)}
              className={`px-6 py-2 rounded-full ${
                selectedDistance === distance.id
                  ? "bg-marathon-blue text-white"
                  : "bg-white text-marathon-darkBlue border border-gray-200 hover:bg-gray-100"
              } transition-colors`}
            >
              {distance.name}
            </button>
          ))}
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
            {packages.map((pkg) => (
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
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold text-marathon-blue">${Number(pkg.price) + getCurrentDistanceAdditionalPrice()}</span>
                    <span className="text-gray-500 ml-1">/person</span>
                  </div>
                  
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
                  
                  <Link to={`/register?package=${pkg.id}&distance=${selectedDistance}`}>
                    <Button className={`w-full ${pkg.recommended ? "button-accent" : "button-primary"}`}>
                      Select Package
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-8 text-center text-gray-500">
          <p>All packages include a contribution to our charitable community initiatives.</p>
        </div>
      </div>
    </section>
  );
};

export default Packages;
