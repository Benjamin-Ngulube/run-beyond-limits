
const LocationMap = () => {
  return (
    <section id="location" className="relative">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="heading-lg text-marathon-darkBlue mb-4">Event Location</h2>
          <div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            The marathon will start and finish at Downtown Central Park. Explore the area
            and plan your visit ahead of time.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Map Embed Placeholder - In a real implementation, replace with actual map */}
          <div className="relative pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.9729696805843!2d-73.97105882404857!3d40.76561623961143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2589a018531e3%3A0xb9df1f7387a94119!2sCentral%20Park!5e0!3m2!1sen!2sus!4v1652887851654!5m2!1sen!2sus"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <LocationInfo 
            icon="📍"
            title="Address"
            info={<>Central Park<br />New York, NY 10022<br />United States</>}
          />
          <LocationInfo 
            icon="🚗"
            title="Parking"
            info="Limited parking available near the event. We recommend using public transportation."
          />
          <LocationInfo 
            icon="🚇"
            title="Public Transit"
            info="Several subway stations nearby. Check event details for specific route information."
          />
        </div>
      </div>
    </section>
  );
};

const LocationInfo = ({ icon, title, info }) => (
  <div className="bg-white rounded-lg shadow-sm p-6 flex">
    <div className="text-4xl mr-4">{icon}</div>
    <div>
      <h3 className="font-bold text-marathon-darkBlue mb-1">{title}</h3>
      <p className="text-gray-600">{info}</p>
    </div>
  </div>
);

export default LocationMap;
