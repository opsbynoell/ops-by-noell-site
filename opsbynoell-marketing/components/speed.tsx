import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { GradientDivider } from "./gradient-divider";

const stats = [
  {
    value: "$960",
    label: "Revenue recovered in 14 days",
  },
  {
    value: "40+",
    label: "Google reviews in 8 weeks",
  },
  {
    value: "<1",
    label: "No-shows per week (was 4)",
  },
  {
    value: "14",
    label: "Days to full results",
  },
];

export const Speed = () => {
  return (
    <section className="pt-10 md:pt-20 lg:pt-10 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 py-10 md:py-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-2">
              <Heading as="h2" className="text-4xl md:text-5xl lg:text-6xl">
                {stat.value}
              </Heading>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
      <GradientDivider />
    </section>
  );
};
