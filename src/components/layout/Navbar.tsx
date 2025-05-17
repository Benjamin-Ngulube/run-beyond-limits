
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold ${isScrolled ? "text-marathon-blue" : "text-white"}`}>
            Marathon<span className="text-marathon-orange">2025</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks isScrolled={isScrolled} />
          <Link to="/register">
            <Button className="bg-marathon-orange hover:bg-orange-600 text-white">
              Register Now
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className={`w-6 h-6 ${isScrolled ? "text-marathon-darkBlue" : "text-white"}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-3 flex flex-col">
            <MobileNavLinks closeMenu={() => setIsMobileMenuOpen(false)} />
            <Link 
              to="/register" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="bg-marathon-orange text-white py-2 px-4 rounded-md text-center mt-4"
            >
              Register Now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" },
  { name: "Packages", path: "/#packages" },
  { name: "Gallery", path: "/#gallery" },
  { name: "Sponsors", path: "/#sponsors" },
  { name: "Results", path: "/results" },
  { name: "Contact", path: "/#contact" },
];

const NavLinks = ({ isScrolled }: { isScrolled: boolean }) => {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`font-medium hover:text-marathon-orange transition-colors ${
            isScrolled ? "text-marathon-darkBlue" : "text-white"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

const MobileNavLinks = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          onClick={closeMenu}
          className="text-marathon-darkBlue py-2 border-b border-gray-100 font-medium"
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default Navbar;
