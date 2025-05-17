
const About = () => {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-marathon-darkBlue mb-4">About Marathon<span className="text-marathon-orange">2025</span></h2>
          <div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Join thousands of runners from around the world in the most anticipated
            marathon event of 2025, set against the stunning backdrop of urban and natural landscapes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon="🏆"
            title="World-Class Event"
            description="Professionally organized marathon with international standards, timing systems, and safety measures."
          />
          <FeatureCard
            icon="🌍"
            title="Scenic Routes"
            description="Run through breathtaking urban landscapes, historical landmarks, and natural beauty."
          />
          <FeatureCard
            icon="🏅"
            title="All Levels Welcome"
            description="Whether you're a professional athlete or a first-time runner, we have categories for everyone."
          />
          <FeatureCard
            icon="🎁"
            title="Premium Kit"
            description="All participants receive a premium runner's kit with high-quality t-shirt, race bib, and more."
          />
          <FeatureCard
            icon="🎉"
            title="Post-Run Celebration"
            description="Enjoy a vibrant atmosphere with entertainment, food, and drinks after crossing the finish line."
          />
          <FeatureCard
            icon="💪"
            title="Training Support"
            description="Access training plans, running groups, and expert advice to prepare for the big day."
          />
        </div>

        <div className="mt-16 bg-gray-50 rounded-lg p-8 shadow-sm">
          <h3 className="heading-sm text-marathon-darkBlue mb-4">Marathon Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DetailItem
              title="Date & Time"
              description="June 21, 2025 | Starting at 6:00 AM"
            />
            <DetailItem
              title="Location"
              description="Downtown Central Park, New York City"
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
