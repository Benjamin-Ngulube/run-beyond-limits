
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Packages from "../components/home/Packages";
import Gallery from "../components/home/Gallery";
import Sponsors from "../components/home/Sponsors";
import TeamSection from "../components/home/TeamSection";
import LocationMap from "../components/home/LocationMap";
import ContactSection from "../components/home/ContactSection";
import HomeHighlights from "../components/home/HomeHighlights"; 

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <HomeHighlights />
        <About />
        <Packages />
        <Gallery />
        <TeamSection />
        <Sponsors />
        <LocationMap />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
