// "use client";
// import Navbar from "./components/LandingPage/Navbar";
// import Hero from "./components/LandingPage/Hero";
// import AboutCard from "./components/LandingPage/AboutCard";
// import Services from "./components/LandingPage/Services";
// import QuoteCalculator from "./components/LandingPage/QuoteCalculator";
// import FormSection from "./components/LandingPage/FormSection";
// import CarouselSection from "./components/LandingPage/CarouselSection";
// import Footer from "./components/LandingPage/Footer";


// export default function LandingPage() {
//   return (
//     <main className="relative z-0 bg-background">
//       <div className="bg-hero-background bg-cover bg-no-repeat bg-center">
//         <Navbar atHome={true} />
//         <Hero />
//       </div>
//       <AboutCard />
//       <Services />
//       <div className="bg-primary">
//         <QuoteCalculator />
//       </div>
//       <FormSection />
//       <CarouselSection />
//       <Footer />
//     </main>
//   );
// }

import LoginBar from "../app/components/login/LoginBar";
import Image from "next/image";

export default function Login() {
  return (
    <main className="w-screen h-screen bg-gradient-to-t from-gradientGreen to-white">
      <Image
        className="mx-auto mb-14 mt-6"
        src="/logomayaluna.jpg"

        width={150}
        height={150}
        alt="logoMayaluna"
      />

      <h3 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        ¡Bienvenido de Nuevo!
      </h3>
      <LoginBar />
    </main>
  );
}
