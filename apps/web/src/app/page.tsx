import Header from "@/components/landing/header";
import HeroSection from "@/components/landing/hero-section";

export default function Page() {
  return (
    <div className="flex flex-col min-h-dvh w-full bg-sidebar h-full">
      <Header />
      <HeroSection />
    </div>
  );
}
