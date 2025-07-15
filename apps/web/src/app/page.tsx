import FAQSection from "@/components/landing/faq-section";
import Features from "@/components/landing/features";
import Footer from "@/components/landing/footer";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";
import HowItWorks from "@/components/landing/how-it-works";
import LandingCTA from "@/components/landing/landing-cta";

export default function Page() {
  return (
    <div className="flex flex-col min-h-dvh w-full bg-sidebar h-full">
      <Header />
      <HeroSection />
      <Features />
      <HowItWorks />
      <FAQSection />
      <LandingCTA />
      <Footer />
    </div>
  );
}
