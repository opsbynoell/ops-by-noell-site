import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Subheading } from "./subheading";
import { Button } from "./ui/button";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import Link from "next/link";

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="py-10 md:py-20 lg:py-32 relative overflow-hidden"
    >
      <Container>
        <div className="text-center mb-12 md:mb-16">
          <Heading>Simple, transparent pricing.</Heading>
          <Subheading className="mt-4 mx-auto">
            No long-term contracts. Month-to-month after setup.
          </Subheading>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PricingCard
            tier="Entry"
            price="197"
            setup="497"
            description="For the business owner ready to stop losing leads to voicemail."
            ctaLink="/book"
            steps={[
              "Missed call text-back",
              "Basic scheduling automation",
              "Review request sequences",
            ]}
          />
          <PricingCard
            tier="Starter"
            price="797"
            setup="997"
            description="For the operator who wants full coverage and a dedicated partner."
            ctaLink="/book"
            featured
            steps={[
              "Everything in Entry",
              "No-show recovery sequences",
              "Reactivation campaigns",
              "Dedicated support",
            ]}
          />
          <PricingCard
            tier="Growth"
            price="1,497"
            setup="1,497"
            description="For the business ready to run a fully automated client operation."
            ctaLink="/book"
            steps={[
              "Everything in Starter",
              "Full communication hub",
              "Custom workflows",
              "Priority support",
            ]}
          />
        </div>

        <div className="mt-10 p-6 md:p-8 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-bold font-display text-neutral-900 dark:text-neutral-100">
              Just need AI chat?
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">
              Nova is available standalone at{" "}
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">
                $497 setup + $197/mo
              </span>
              .
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/book">Book Free Audit</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
};

const PricingCard = ({
  tier,
  price,
  setup,
  description,
  ctaLink,
  steps,
  featured = false,
}: {
  tier: string;
  price: string;
  setup: string;
  description: string;
  ctaLink: string;
  steps: string[];
  featured?: boolean;
}) => {
  return (
    <div
      className={`p-6 md:p-8 rounded-2xl flex flex-col gap-6 ${
        featured
          ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 ring-2 ring-neutral-900 dark:ring-neutral-100"
          : "bg-neutral-100 dark:bg-neutral-800"
      }`}
    >
      <div>
        <p
          className={`text-xs uppercase tracking-wider font-semibold mb-3 ${
            featured
              ? "text-neutral-300 dark:text-neutral-600"
              : "text-neutral-500"
          }`}
        >
          {tier}
        </p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl md:text-4xl font-bold font-display">
            ${price}
          </span>
          <span
            className={`text-sm ${featured ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-400"}`}
          >
            /mo
          </span>
        </div>
        <p
          className={`text-sm mt-1 ${featured ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-400"}`}
        >
          + ${setup} setup
        </p>
        <p
          className={`text-sm mt-3 ${featured ? "text-neutral-200 dark:text-neutral-700" : "text-neutral-600 dark:text-neutral-400"}`}
        >
          {description}
        </p>
      </div>

      <ul className="list-none flex flex-col gap-2.5 flex-1">
        {steps.map((step, index) => (
          <li key={step + index} className="flex items-center gap-2">
            <IconCircleCheckFilled
              className={`size-4 shrink-0 ${featured ? "text-neutral-300 dark:text-neutral-600" : "text-neutral-500"}`}
            />
            <p
              className={`text-sm ${featured ? "text-neutral-100 dark:text-neutral-800" : "text-neutral-700 dark:text-neutral-300"}`}
            >
              {step}
            </p>
          </li>
        ))}
      </ul>

      <Button
        asChild
        variant={featured ? "secondary" : "default"}
        className="w-full"
      >
        <Link href={ctaLink}>Book Free Audit</Link>
      </Button>
    </div>
  );
};
