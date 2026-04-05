import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Button } from "./ui/button";
import Link from "next/link";

export const DarkCTA = () => {
  return (
    <section className="py-10 md:py-20 lg:py-32 bg-neutral-900 dark:bg-neutral-950 relative overflow-hidden">
      <Container className="text-center">
        <Heading className="text-white">
          Stop losing clients <br /> you never knew about.
        </Heading>
        <Subheading className="py-6 mx-auto text-neutral-300">
          In 30 minutes, we show you your numbers. No pitch. No slides. Just the
          data.
        </Subheading>
        <Button asChild size="lg" className="shadow-brand">
          <Link href="/book">Get Your Free Audit</Link>
        </Button>
      </Container>
    </section>
  );
};
