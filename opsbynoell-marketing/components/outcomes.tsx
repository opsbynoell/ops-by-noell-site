import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { GradientDivider } from "./gradient-divider";

const results = [
  {
    before: "4",
    after: "< 1",
    label: "No-shows per week",
  },
  {
    before: "$0",
    after: "$960",
    label: "Revenue recovered",
  },
  {
    before: "Manual",
    after: "40+ in 8 weeks",
    label: "Google reviews",
  },
  {
    before: "Manual",
    after: "Fully automated",
    label: "Reminders",
  },
];

export const Outcomes = () => {
  return (
    <section
      id="outcomes"
      className="pt-10 md:pt-20 lg:pt-32 relative overflow-hidden"
    >
      <Container>
        <Heading>4 no-shows a week. Then none.</Heading>

        <Subheading className="py-8 max-w-3xl">
          Santa is a massage therapist in Laguna Niguel. She was doing
          everything herself. Answering calls between sessions, sending reminder
          texts manually at night, chasing down cancellations. In 14 days, that
          stopped. The system ran confirmations. Reminders went out
          automatically. A cancellation on a Friday morning triggered a waitlist
          offer, and the slot was filled before she saw the notification. She
          didn&apos;t change her services, her pricing, or her marketing. She
          changed what was running in the background.
        </Subheading>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 md:mt-12">
          {results.map((result) => (
            <div
              key={result.label}
              className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-800 flex flex-col gap-3"
            >
              <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">
                {result.label}
              </p>
              <div className="flex flex-col gap-1">
                <p className="text-sm text-neutral-400 line-through">
                  {result.before}
                </p>
                <p className="text-xl md:text-2xl font-bold font-display text-neutral-900 dark:text-neutral-100">
                  {result.after}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
      <GradientDivider />
    </section>
  );
};
