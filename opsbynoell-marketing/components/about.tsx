import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Card, CardContent, CardTitle } from "./features/card";

const whyCards = [
  {
    title: "We specialize in local businesses.",
    description:
      "No enterprise clients. No SaaS. Every system is for a local service business owner who wears every hat.",
  },
  {
    title: "We build it. We manage it. We keep it running.",
    description:
      "We design your system, install every component, test it before go-live, and manage it from there. You never touch a setting.",
  },
  {
    title: "We focus on revenue, not vanity metrics.",
    description:
      "We track leads recovered, appointments booked, no-shows prevented, reviews generated, clients reactivated.",
  },
  {
    title: "We show you the math first. Always.",
    description:
      "Before you spend a dollar on a build, you see exactly what your operational gaps cost you monthly, quantified from your actual numbers.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-10 md:py-20 lg:py-32">
      <Container>
        <Heading>Built by The Noells. Powered by automation.</Heading>

        <Subheading className="py-8 max-w-3xl">
          We&apos;re Nikki and James Noell, a husband-and-wife team from Mission
          Viejo, California. We&apos;ve spent years inside fast-growing
          companies building systems, managing operations, and fixing what was
          broken. That&apos;s just how we&apos;re wired.
          <br />
          <br />
          We kept seeing the same thing: talented people running great
          businesses, losing clients not because of bad service, but because
          nothing happened after the call. No follow-up. No reminder. No review
          request. The work was excellent. The systems behind it were
          nonexistent.
          <br />
          <br />
          So we built the fix. And then we built it for everyone else.
          <br />
          <br />
          Ops by Noell is our family name on the door. That means something to
          us. Every system we build, we build like it&apos;s our own business on
          the line. Because in a way, it is.
        </Subheading>

        <div className="mb-12 flex items-center justify-start">
          <div className="w-64 h-72 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center border border-neutral-200 dark:border-neutral-700">
            <p className="text-sm text-neutral-400">Founder photo</p>
          </div>
        </div>

        <h3 className="text-xl md:text-2xl font-bold font-display mb-8">
          Why Ops by Noell
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {whyCards.map((card, index) => (
            <Card
              key={card.title}
              className={
                index === 0
                  ? "rounded-tl-3xl rounded-bl-3xl"
                  : index === whyCards.length - 1
                    ? "rounded-tr-3xl rounded-br-3xl"
                    : ""
              }
            >
              <CardContent className="flex-col items-start gap-3 py-8">
                <CardTitle className="text-base md:text-lg">
                  {card.title}
                </CardTitle>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};
