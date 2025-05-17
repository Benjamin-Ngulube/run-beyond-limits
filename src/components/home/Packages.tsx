
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const packages = [
  {
    id: 1,
    name: "Basic Runner",
    price: 49,
    features: [
      "Official race entry",
      "Race bib with timing chip",
      "Basic runner's t-shirt",
      "Finisher's medal",
      "Hydration stations access"
    ],
    recommended: false,
  },
  {
    id: 2,
    name: "Premium Runner",
    price: 89,
    features: [
      "Official race entry",
      "Race bib with timing chip",
      "Premium technical t-shirt",
      "Finisher's medal",
      "Hydration stations access",
      "Post-race massage",
      "Digital race day photos",
      "Energy gel pack"
    ],
    recommended: true,
  },
  {
    id: 3,
    name: "Elite Experience",
    price: 149,
    features: [
      "Official race entry",
      "Race bib with timing chip",
      "Premium technical t-shirt & shorts",
      "Finisher's medal",
      "Hydration stations access",
      "Post-race massage",
      "Digital race day photos",
      "Energy gel pack",
      "VIP tent access",
      "Pre-race training plan",
      "Exclusive marathon jacket",
      "Priority starting position"
    ],
    recommended: false,
  }
];

const distances = [
  { id: "5k", name: "5K Fun Run", additionalPrice: 0 },
  { id: "10k", name: "10K Race", additionalPrice: 10 },
  { id: "half", name: "Half Marathon", additionalPrice: 25 },
  { id: "full", name: "Full Marathon", additionalPrice: 40 }
];

const Packages = () => {
  const [selectedDistance, setSelectedDistance] = useState(distances[0].id);

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

        {/* Packages Display */}
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
                  <span className="text-4xl font-bold text-marathon-blue">${pkg.price + getCurrentDistanceAdditionalPrice()}</span>
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
        
        <div className="mt-8 text-center text-gray-500">
          <p>All packages include a contribution to our charitable community initiatives.</p>
        </div>
      </div>
    </section>
  );
  
  function getCurrentDistanceAdditionalPrice() {
    const distance = distances.find(d => d.id === selectedDistance);
    return distance ? distance.additionalPrice : 0;
  }
};

export default Packages;
