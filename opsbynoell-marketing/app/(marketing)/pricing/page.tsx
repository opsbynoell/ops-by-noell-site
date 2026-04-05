import { Pricing } from "@/components/pricing";
import { FAQs } from "@/components/faqs";
import { DarkCTA } from "@/components/dark-cta";
import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <section className="py-16 md:py-24">
        <Container className="text-center">
          <Subheading className="mx-auto">Pricing</Subheading>
          <Heading as="h1" className="mt-4">
            Simple, transparent pricing.
          </Heading>
          <Subheading className="mt-4 mx-auto max-w-2xl">
            No long-term contracts. No hidden fees. You see your numbers before
            you spend a dollar.
          </Subheading>
        </Container>
      </section>
      <Pricing />
      <FAQs />
      <DarkCTA />
    </div>
  );
}
