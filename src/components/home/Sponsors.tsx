
const sponsorsData = {
  platinum: [
    { id: 1, name: "SportFit", logo: "https://placehold.co/200x100/f8fafc/475569?text=SportFit", url: "#" },
    { id: 2, name: "RunPro", logo: "https://placehold.co/200x100/f8fafc/475569?text=RunPro", url: "#" },
  ],
  gold: [
    { id: 3, name: "EnergyDrink", logo: "https://placehold.co/180x90/f8fafc/475569?text=EnergyDrink", url: "#" },
    { id: 4, name: "AthleteGear", logo: "https://placehold.co/180x90/f8fafc/475569?text=AthleteGear", url: "#" },
    { id: 5, name: "FitTech", logo: "https://placehold.co/180x90/f8fafc/475569?text=FitTech", url: "#" },
  ],
  silver: [
    { id: 6, name: "HealthCare", logo: "https://placehold.co/160x80/f8fafc/475569?text=HealthCare", url: "#" },
    { id: 7, name: "VitalWater", logo: "https://placehold.co/160x80/f8fafc/475569?text=VitalWater", url: "#" },
    { id: 8, name: "TrackPro", logo: "https://placehold.co/160x80/f8fafc/475569?text=TrackPro", url: "#" },
    { id: 9, name: "FitFuel", logo: "https://placehold.co/160x80/f8fafc/475569?text=FitFuel", url: "#" },
  ]
};

const Sponsors = () => {
  return (
    <section id="sponsors" className="section-padding bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-marathon-darkBlue mb-4">Our Sponsors</h2>
          <div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We're proud to partner with these amazing brands that help make
            Marathon2025 an unforgettable experience for all participants.
          </p>
        </div>

        {/* Platinum Sponsors */}
        <div className="mb-16">
          <h3 className="text-center text-xl font-bold text-marathon-blue mb-6">
            Platinum Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {sponsorsData.platinum.map((sponsor) => (
              <SponsorLogo
                key={sponsor.id}
                name={sponsor.name}
                logo={sponsor.logo}
                url={sponsor.url}
                size="large"
              />
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-16">
          <h3 className="text-center text-xl font-bold text-marathon-blue mb-6">
            Gold Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsorsData.gold.map((sponsor) => (
              <SponsorLogo
                key={sponsor.id}
                name={sponsor.name}
                logo={sponsor.logo}
                url={sponsor.url}
                size="medium"
              />
            ))}
          </div>
        </div>

        {/* Silver Sponsors */}
        <div>
          <h3 className="text-center text-xl font-bold text-marathon-blue mb-6">
            Silver Sponsors
          </h3>
          <div className="flex flex-wrap justify-center gap-6">
            {sponsorsData.silver.map((sponsor) => (
              <SponsorLogo
                key={sponsor.id}
                name={sponsor.name}
                logo={sponsor.logo}
                url={sponsor.url}
                size="small"
              />
            ))}
          </div>
        </div>

        {/* Become a Sponsor CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-marathon-darkBlue mb-4">
            Become a Sponsor
          </h3>
          <p className="text-gray-600 mb-6">
            Join our growing family of sponsors and connect your brand with thousands of
            active and engaged participants.
          </p>
          <a 
            href="mailto:sponsors@marathon2025.com" 
            className="inline-block button-primary"
          >
            Contact Our Sponsorship Team
          </a>
        </div>
      </div>
    </section>
  );
};

const SponsorLogo = ({ name, logo, url, size }) => {
  const sizeClasses = {
    large: "w-48 h-24",
    medium: "w-40 h-20",
    small: "w-32 h-16"
  };

  return (
    <a 
      href={url}
      className={`${sizeClasses[size]} bg-white rounded-lg shadow-md p-4 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:scale-105`}
    >
      <img
        src={logo}
        alt={`${name} logo`}
        className="max-w-full max-h-full"
      />
    </a>
  );
};

export default Sponsors;
