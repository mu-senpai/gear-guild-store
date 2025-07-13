import { AboutUsSection } from "@/components/pages/Home/AboutUsSection";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import HeroSection from "@/components/pages/Home/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <FeaturedProducts />
      <AboutUsSection />
    </div>
  );
}
