"use client";
import Navbar from "./components/LandingPage/Navbar";
import Hero from "./components/LandingPage/Hero";
import AboutCard from "./components/LandingPage/AboutCard";
import Services from "./components/LandingPage/Services";
import QuoteCalculator from "./components/LandingPage/QuoteCalculator";
import FormSection from "./components/LandingPage/FormSection";
import CarouselSection from "./components/LandingPage/CarouselSection";
import Footer from "./components/LandingPage/Footer";


export default function LandingPage() {
  return (
    <main className="relative z-0 bg-background">
      <div className="bg-hero-background bg-cover bg-no-repeat bg-center">
        <Navbar atHome={true} />
        <Hero />
      </div>
      <AboutCard />
      <Services />
      <div className="bg-primary">
        <QuoteCalculator />
      </div>
      <FormSection />
      <CarouselSection />
      <Footer />
    </main>
  );
}
