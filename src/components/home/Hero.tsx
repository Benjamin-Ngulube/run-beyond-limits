
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Define a type for the time left object
interface TimeLeft {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
}

const calculateTimeLeft = (): TimeLeft => {
  const difference = +new Date("2025-06-21") - +new Date();
  let timeLeft: TimeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  return timeLeft;
};

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <div className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      {/* Background video or image could be added here */}
      
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="heading-xl text-white mb-4 animate-fade-in">
          Marathon<span className="text-marathon-orange">2025</span>
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
          Challenge Yourself at the Most Exciting Running Event on June 21, 2025
        </p>
        
        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto">
          <CountdownItem value={timeLeft.days} label="Days" />
          <CountdownItem value={timeLeft.hours} label="Hours" />
          <CountdownItem value={timeLeft.minutes} label="Minutes" />
          <CountdownItem value={timeLeft.seconds} label="Seconds" />
        </div>
        
        {/* CTA Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/register">
            <Button className="button-accent w-full md:w-auto text-lg">
              Register Now
            </Button>
          </Link>
          <Link to="/#packages">
            <Button variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 w-full md:w-auto text-lg">
              View Packages
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll down indicator */}
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white flex flex-col items-center animate-bounce"
      >
        <span className="mb-2">Scroll Down</span>
        <svg 
          className="w-6 h-6" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </a>
    </div>
  );
};

interface CountdownItemProps {
  value?: number;
  label: string;
}

const CountdownItem = ({ value, label }: CountdownItemProps) => (
  <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 animate-countdown">
    <div className="text-4xl md:text-5xl font-bold text-white">
      {value || '00'}
    </div>
    <div className="text-sm uppercase tracking-wider text-gray-300">{label}</div>
  </div>
);

export default Hero;
