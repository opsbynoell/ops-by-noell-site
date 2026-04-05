import React from "react";
import { Container } from "@/components/agenforce/container";
import { cn } from "@/lib/utils";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonTwo } from "./skeletons/second";
import { SkeletonThree } from "./skeletons/third";
import { SkeletonFour } from "./skeletons/four";

export const FeaturesTertiary = () => {
  return (
    <section className="pt-10 md:pt-20 lg:py-32 relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 border-y border-neutral-200 divide-neutral-200">
          <div className="md:border-r border-b border-neutral-200">
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800">
                Lead Pipeline
              </h2>
              <CardDescription>
                Every inquiry that doesn't book immediately is tracked and followed up automatically. No lead slips through the cracks.
              </CardDescription>
            </CardContent>
            <CardSkeleton>
              <SkeletonOne />
            </CardSkeleton>
          </div>
          <div className="border-b border-neutral-200">
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800">
                Reactivation Campaigns
              </h2>
              <CardDescription>
                Past clients who've gone quiet get a targeted re-engagement sequence. One campaign recovers 8–12 lapsed clients per send.
              </CardDescription>
            </CardContent>
            <CardSkeleton className="mask-radial-from-20%">
              <SkeletonTwo />
            </CardSkeleton>
          </div>
          <div className="md:border-r border-neutral-200">
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800">
                Reputation Engine
              </h2>
              <CardDescription>
                Automated review requests after every completed appointment. Clients who had a great experience become your loudest advocates.
              </CardDescription>
            </CardContent>
            <CardSkeleton className="mask-radial-from-20% mask-r-from-50%">
              <SkeletonThree />
            </CardSkeleton>
          </div>
          <div>
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800">
                Client Communication Hub
              </h2>
              <CardDescription>
                Confirmations, reminders, follow-ups, and no-show recovery — all managed and monitored, so nothing falls through.
              </CardDescription>
            </CardContent>
            <CardSkeleton>
              <SkeletonFour />
            </CardSkeleton>
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
    <p className="text-neutral-600 mt-2 max-w-md text-balance">{children}</p>
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
