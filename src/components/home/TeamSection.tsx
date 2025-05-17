
const teamData = [
  {
    id: 1,
    name: "Alex Kashimu",
    role: "Executive Director",
    image: "src/components/pictures/team/Alex Kashimu.jpeg",
    bio: "Former Olympic marathon runner with 15+ years experience organizing international sporting events."
  },
  {
    id: 2,
    name: "Alex Kashimu",
    role: "Race Coordinator",
    image: "src/components/pictures/team/Ackim Kashimu.jpg",
    bio: "Certified sports management professional specializing in marathon course design and logistics."
  },
  {
    id: 3,
    name: "Jessica Chen",
    role: "Participant Experience",
    image: "src/components/pictures/team/Chinyimba Katongo.jpg",
    bio: "Passionate about creating memorable experiences for runners of all levels and abilities."
  },
  {
    id: 4,
    name: "David Okoye",
    role: "Medical Director",
    image: "src/components/pictures/team/Edwin Kasito.jpg",
    bio: "Sports medicine physician with extensive experience in marathon medical support."
  },
  {
    id: 4,
    name: "David Okoye",
    role: "Medical Director",
    image: "src/components/pictures/team/iCeMorgan.jpg",
    bio: "Sports medicine physician with extensive experience in marathon medical support."
  },
  {
    id: 4,
    name: "David Okoye",
    role: "Medical Director",
    image: "src/components/pictures/team/Malaika Chilambwe.jpg",
    bio: "Sports medicine physician with extensive experience in marathon medical support."
  }
];

const TeamSection = () => {
  return (
    <section id="team" className="section-padding bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="heading-lg text-marathon-darkBlue mb-4">Meet Our Team</h2>
          <div className="w-24 h-1 bg-marathon-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our dedicated team of professionals is committed to creating an
            unforgettable marathon experience for every participant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.map((member) => (
            <TeamMember
              key={member.id}
              name={member.name}
              role={member.role}
              image={member.image}
              bio={member.bio}
            />
          ))}
        </div>
        
        <div className="mt-16 bg-marathon-blue/5 rounded-lg p-8">
          <h3 className="heading-sm text-marathon-darkBlue mb-4 text-center">Join Our Volunteer Team</h3>
          <p className="text-gray-600 text-center mb-6">
            Be part of making Marathon2025 a success! We're looking for enthusiastic volunteers
            to help with various aspects of the event.
          </p>
          <div className="text-center">
            <a 
              href="#" 
              className="inline-block button-primary"
            >
              Become a Volunteer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const TeamMember = ({ name, role, image, bio }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div className="p-4 text-white">
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-marathon-orange font-medium">{role}</p>
          </div>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{bio}</p>
        <div className="mt-4 flex space-x-3">
          <SocialIcon icon="facebook" />
          <SocialIcon icon="twitter" />
          <SocialIcon icon="linkedin" />
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ icon }) => {
  return (
    <a 
      href="#" 
      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-marathon-blue hover:text-white transition-colors"
    >
      <span className="sr-only">{icon}</span>
      {icon === "facebook" && (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      )}
      {icon === "twitter" && (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
        </svg>
      )}
      {icon === "linkedin" && (
        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )}
    </a>
  );
};

export default TeamSection;
