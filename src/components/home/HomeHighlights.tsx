
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HomeHighlights = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Event News */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-marathon-blue">
            <h3 className="text-xl font-bold text-marathon-darkBlue mb-3">Latest News</h3>
            <div className="space-y-4 mb-4">
              <NewsItem 
                title="Registration Now Open" 
                date="May 15, 2025" 
              />
              <NewsItem 
                title="New Course Revealed" 
                date="May 10, 2025" 
              />
              <NewsItem 
                title="Training Program Announced" 
                date="May 5, 2025" 
              />
            </div>
            <Button variant="outline" className="w-full border-marathon-blue text-marathon-blue hover:bg-marathon-blue/5 mt-2">
              Read All News
            </Button>
          </div>
          
          {/* Featured Event */}
          <div className="bg-gradient-to-br from-marathon-darkBlue to-marathon-blue text-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold mb-3">Marathon Weekend</h3>
            <p className="mb-4">Join us for a full weekend of activities including the expo, pasta party, and race day celebrations!</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-baseline gap-2">
                <span className="font-bold">June 19:</span> 
                <span>Race Expo & Packet Pickup</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-bold">June 20:</span> 
                <span>Pre-Race Dinner & Briefing</span>
              </li>
              <li className="flex items-baseline gap-2">
                <span className="font-bold">June 21:</span> 
                <span>Race Day & Awards Ceremony</span>
              </li>
            </ul>
            <Link to="/register">
              <Button className="w-full bg-white text-marathon-darkBlue hover:bg-gray-100">
                Register Now
              </Button>
            </Link>
          </div>
          
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm p-6 border-t-4 border-marathon-orange">
            <h3 className="text-xl font-bold text-marathon-darkBlue mb-3">Race Highlights</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <StatItem number="5,000+" label="Participants" />
              <StatItem number="42.2" label="KM Full Course" />
              <StatItem number="3" label="Race Categories" />
              <StatItem number="12" label="Water Stations" />
            </div>
            <p className="text-gray-600 mt-4">
              Join runners from over 30 countries in Zambia's biggest marathon event
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

const NewsItem = ({ title, date }) => (
  <div className="pb-3 border-b border-gray-100">
    <h4 className="font-medium text-marathon-darkBlue">{title}</h4>
    <p className="text-sm text-gray-500">{date}</p>
  </div>
);

const StatItem = ({ number, label }) => (
  <div className="text-center bg-gray-50 p-3 rounded-lg">
    <div className="text-xl font-bold text-marathon-blue">{number}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </div>
);

export default HomeHighlights;
