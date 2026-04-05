import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Button } from "./ui/button";
import Link from "next/link";
import { LandingImages } from "./landing-images";
import { GradientDivider } from "./gradient-divider";

export const Hero = () => {
  return (
    <section className="pt-10 md:pt-20 lg:pt-32 relative overflow-hidden">
      <Container>
        <Heading as="h1">
          By the time you call back, <br /> they&apos;ve already booked somewhere else.
        </Heading>

        <Subheading className="py-8">
          Every missed call recovered. Every lead answered. Your calendar stays
          full. You stay focused on the client in front of you.
        </Subheading>
        <div className="flex items-center gap-6 flex-wrap">
          <Button asChild className="shadow-brand">
            <Link href="/book">Get Your Free Audit</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#features">See How It Works</Link>
          </Button>
        </div>
        <LandingImages />
      </Container>
      <GradientDivider />
    </section>
  );
};
