import { About } from "@/components/about";
import { DarkCTA } from "@/components/dark-cta";
import { FAQs } from "@/components/faqs";
import { Features } from "@/components/features";
import { FeaturesSecondary } from "@/components/features-secondary";
import { FeaturesTertiary } from "@/components/features-tertiary";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Outcomes } from "@/components/outcomes";
import { Pricing } from "@/components/pricing";
import { Speed } from "@/components/speed";
import { WhoThisIsFor } from "@/components/who-this-is-for";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <LogoCloud />
      <WhoThisIsFor />
      <Features />
      <Speed />
      <FeaturesSecondary />
      <Outcomes />
      <About />
      <FeaturesTertiary />
      <Pricing />
      <FAQs />
      <DarkCTA />
    </div>
  );
}
