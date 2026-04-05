import React from "react";
import { Container } from "@/components/container";
import { cn } from "@/lib/utils";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonTwo } from "./skeletons/second";
import { WorkflowIcon, IntegrationIcon, HumanIcon } from "@/icons";

export const FeaturesSecondary = () => {
  return (
    <section
      id="product"
      className="pt-10 md:pt-20 lg:py-32 relative overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 border-y border-neutral-200 dark:border-neutral-800 divide-y md:divide-y-0 md:divide-x divide-neutral-200 dark:divide-neutral-800">
          <div>
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                No-Show Recovery
              </h2>
              <CardDescription>
                Automated sequences chase no-shows, reschedule them, and fill
                your empty slots before the day is over.
              </CardDescription>
            </CardContent>
            <CardSkeleton>
              <SkeletonOne />
            </CardSkeleton>
          </div>
          <div>
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800 dark:text-neutral-200">
                Reactivation Campaigns
              </h2>
              <CardDescription>
                Past clients who went quiet get re-engagement sequences. One
                campaign recovers 8-12 lapsed clients per send.
              </CardDescription>
            </CardContent>
            <CardSkeleton className="mask-radial-from-50% mask-t-from-50%">
              <SkeletonTwo />
            </CardSkeleton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-10 md:mt-20">
          <div>
            <div className="flex items-center gap-2">
              <WorkflowIcon />
              <h3 className="font-bold text-lg text-neutral-600 dark:text-neutral-400">
                Missed Call Text-Back
              </h3>
            </div>
            <p className="text-neutral-500 text-base mt-2">
              Every missed call gets an instant text with a booking link.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <IntegrationIcon />
              <h3 className="font-bold text-lg text-neutral-600 dark:text-neutral-400">
                Smart Scheduling
              </h3>
            </div>
            <p className="text-neutral-500 text-base mt-2">
              AI books, confirms, and reminds 24/7.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <HumanIcon />
              <h3 className="font-bold text-lg text-neutral-600 dark:text-neutral-400">
                Review Autopilot
              </h3>
            </div>
            <p className="text-neutral-500 text-base mt-2">
              Timed Google review requests after every appointment.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <WorkflowIcon />
              <h3 className="font-bold text-lg text-neutral-600 dark:text-neutral-400">
                No-Show Recovery
              </h3>
            </div>
            <p className="text-neutral-500 text-base mt-2">
              Automated sequences fill empty slots before the day is over.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
};

export const CardContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="p-4 md:p-8">{children}</div>;
};

export const CardDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <p className="text-neutral-600 dark:text-neutral-400 mt-2 max-w-md text-balance">
      {children}
    </p>
  );
};

export const CardSkeleton = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative h-80 sm:h-60 flex flex-col md:h-80 overflow-hidden perspective-distant",
        className
      )}
    >
      {children}
    </div>
  );
};
