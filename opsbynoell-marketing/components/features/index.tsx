import React from "react";
import { Container } from "../container";
import { Heading } from "../heading";
import { Subheading } from "../subheading";
import { Card, CardContent, CardCTA, CardSkeleton, CardTitle } from "./card";
import { IconPlus } from "@tabler/icons-react";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonThree } from "./skeletons/third";
import { SkeletonTwo } from "./skeletons/second";

export const Features = () => {
  return (
    <Container className="py-10 md:py-20 lg:py-32">
      <div
        id="features"
        className="flex xl:flex-row flex-col xl:items-baseline-last justify-between gap-10"
      >
        <Heading className="text-center lg:text-left">
          Three systems. <br /> One outcome: a full calendar.
        </Heading>
        <Subheading className="text-center lg:text-left mx-auto lg:mx-0">
          We build and manage the automation stack that keeps your business
          running between sessions — so you never lose a lead to voicemail again.
        </Subheading>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 my-10 md:my-20">
        <Card className="rounded-tl-3xl rounded-bl-3xl">
          <CardSkeleton>
            <SkeletonOne />
          </CardSkeleton>
          <CardContent>
            <CardTitle>Missed Call Text-Back</CardTitle>
            <CardCTA>
              <IconPlus />
            </CardCTA>
          </CardContent>
        </Card>
        <Card>
          <CardSkeleton>
            <SkeletonTwo />
          </CardSkeleton>
          <CardContent>
            <CardTitle>Smart Scheduling</CardTitle>
            <CardCTA>
              <IconPlus />
            </CardCTA>
          </CardContent>
        </Card>
        <Card className="rounded-tr-3xl rounded-br-3xl">
          <CardSkeleton>
            <SkeletonThree />
          </CardSkeleton>
          <CardContent>
            <CardTitle>Review Autopilot</CardTitle>
            <CardCTA>
              <IconPlus />
            </CardCTA>
          </CardContent>
        </Card>
      </div>
    </Container>
  );
};
