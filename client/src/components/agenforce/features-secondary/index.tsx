import React from "react";
import { Container } from "@/components/agenforce/container";
import { cn } from "@/lib/utils";
import { SkeletonOne } from "./skeletons/first";
import { SkeletonTwo } from "./skeletons/second";
import {
  IconPhone,
  IconCalendarCheck,
  IconStar,
  IconMessage,
} from "@tabler/icons-react";

export const FeaturesSecondary = () => {
  return (
    <section
      id="product"
      className="pt-10 md:pt-20 lg:py-32 relative overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 border-y border-neutral-200 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          <div>
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800">
                Missed Call Text-Back
              </h2>
              <CardDescription>
                When a client calls and you miss it, they get a personalized text back within seconds — with a direct booking link. 85% of callers never call back after voicemail.
              </CardDescription>
            </CardContent>
            <CardSkeleton>
              <SkeletonOne />
            </CardSkeleton>
          </div>
          <div>
            <CardContent>
              <h2 className="text-lg font-bold text-neutral-800">
                Smart Scheduling
              </h2>
              <CardDescription>
                A 24/7 AI system that fields inquiries, answers questions about your services and availability, and books appointments — even while you sleep.
              </CardDescription>
            </CardContent>
            <CardSkeleton className="mask-radial-from-50% mask-t-from-50%">
              <SkeletonTwo />
            </CardSkeleton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-10 md:mt-20">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="size-7 rounded-lg bg-teal-50 border border-teal-200 flex items-center justify-center shrink-0">
                <IconPhone className="size-4 text-teal-600" />
              </div>
              <h3 className="font-bold text-base text-neutral-700">Missed Call Text-Back</h3>
            </div>
            <p className="text-neutral-500 text-sm">
              Never lose a lead to voicemail again. Every missed call gets an instant, branded text.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="size-7 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center shrink-0">
                <IconCalendarCheck className="size-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-base text-neutral-700">Smart Scheduling</h3>
            </div>
            <p className="text-neutral-500 text-sm">
              AI that books, confirms, and reminds — around the clock, without any setup from you.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="size-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center shrink-0">
                <IconStar className="size-4 text-amber-600" />
              </div>
              <h3 className="font-bold text-base text-neutral-700">Review Autopilot</h3>
            </div>
            <p className="text-neutral-500 text-sm">
              After every appointment, a timed review request goes out automatically to Google.
            </p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="size-7 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center shrink-0">
                <IconMessage className="size-4 text-green-600" />
              </div>
              <h3 className="font-bold text-base text-neutral-700">No-Show Recovery</h3>
            </div>
            <p className="text-neutral-500 text-sm">
              Automated follow-up sequences that chase no-shows and reschedule them before they're gone.
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

export const CardDescription = ({ children }: { children: React.ReactNode }) => {
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
