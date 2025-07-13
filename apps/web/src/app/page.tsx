import Features from "@/components/landing/features";
import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";

export default function Page() {
  return (
    <div className="flex flex-col space-y-10 min-h-dvh w-full bg-sidebar h-full">
      <Header />
      <HeroSection />
      <Features />
    </div>
  );
}
