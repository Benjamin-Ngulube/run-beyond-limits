
const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-marathon-darkBlue mb-4">About Marathon<span className="text-marathon-orange">2025</span></h2>
          <div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            The Marathon2025 event is Zambia's premier running celebration, bringing together athletes and enthusiasts from across Africa and beyond. Born from a vision to promote health, community engagement, and Zambia's natural beauty, our marathon has grown into a landmark event on the African sporting calendar.
          </p>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Since its inception, our race has attracted participants of all ages and abilities, creating a tradition that celebrates the spirit of Zambia—resilience, community, and excellence. The route takes runners through some of Lusaka's most scenic areas, showcasing our country's stunning landscapes and vibrant culture.
          </p>
          
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">
            Beyond just a race, Marathon2025 serves as a platform for positive social impact. A portion of all registration fees goes toward supporting local educational initiatives and environmental conservation efforts, ensuring that our event leaves a lasting legacy for generations to come.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <FeatureCard
            icon="🏆"
            title="World-Class Event"
            description="Professionally organized with international standards, timing systems, and comprehensive safety measures."
          />
          <FeatureCard
            icon="🌍"
            title="Scenic Zambian Routes"
            description="Experience Zambia's natural beauty and urban landmarks along our carefully designed courses."
          />
          <FeatureCard
            icon="🏅"
            title="Inclusive Categories"
            description="Events for elite athletes, casual runners, and everyone in between—including youth and senior divisions."
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-8 shadow-sm">
          <h3 className="heading-sm text-marathon-darkBlue mb-4 text-center">Marathon Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem
              title="Date & Time"
              description="June 21, 2025 | Starting at 6:00 AM"
            />
            <DetailItem
              title="Location"
              description="Heroes Stadium, Lusaka, Zambia"
            />
            <DetailItem
              title="Distances"
              description="Marathon (42.2km), Half Marathon (21.1km), 10K Run"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1 border border-gray-100">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold text-marathon-darkBlue mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const DetailItem = ({ title, description }) => (
  <div className="flex flex-col items-center">
    <h4 className="text-lg font-bold text-marathon-blue">{title}</h4>
    <p className="text-gray-600 text-center">{description}</p>
  </div>
);

export default About;
