import React from "react";
import { Container } from "./container";
import { Heading } from "./heading";
import { Card, CardContent, CardTitle } from "./features/card";

const cards = [
  {
    title: "Massage Therapists",
    description:
      "You're in a room. Hands on a client. Your phone is at the front desk, and it's ringing.",
  },
  {
    title: "Med Spa Owners",
    description:
      "High-value leads. Short booking windows. You can't afford to say you'll call them back later.",
  },
  {
    title: "Salon Owners",
    description:
      "You built this so you could do hair, not return voicemails at 9 PM.",
  },
  {
    title: "Dental Offices",
    description:
      "Your front desk is overwhelmed. Your recall list is growing. Something has to give.",
  },
];

export const WhoThisIsFor = () => {
  return (
    <section className="py-10 md:py-20 lg:py-32">
      <Container>
        <Heading className="text-center lg:text-left">
          Built for the people <br /> doing the actual work.
        </Heading>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 md:mt-16">
          {cards.map((card, index) => (
            <Card
              key={card.title}
              className={
                index === 0
                  ? "rounded-tl-3xl rounded-bl-3xl"
                  : index === cards.length - 1
                    ? "rounded-tr-3xl rounded-br-3xl"
                    : ""
              }
            >
              <CardContent className="flex-col items-start gap-3 py-8">
                <CardTitle className="text-lg md:text-xl">
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
