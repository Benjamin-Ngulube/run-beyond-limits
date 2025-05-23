
import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import HomeHighlights from "../components/home/HomeHighlights";
import Packages from "../components/home/Packages";
import Gallery from "../components/home/Gallery";
import TeamSection from "../components/home/TeamSection";
import ContactSection from "../components/home/ContactSection";
import LocationMap from "../components/home/LocationMap";
import Footer from "../components/layout/Footer";
import Sponsors from "../components/home/Sponsors";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <HomeHighlights />
        <Packages />
        <Gallery />
        <TeamSection />
        <Sponsors />
        <ContactSection />
        <LocationMap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
