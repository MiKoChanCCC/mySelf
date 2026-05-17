import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import WhatIDoSection from "@/components/sections/WhatIDoSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/layout/Footer";
import PageIntro from "@/components/layout/PageIntro";

export default function HomePage() {
  return (
    <main className="relative">
      <PageIntro />
      <HeroSection />
      <WhatIDoSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
