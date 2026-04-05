import { LogoIcon } from "@/components/agenforce/logo-icon";
import { cn } from "@/lib/utils";
import {
  IconBrandGoogle,
  IconCalendarCheck,
  IconCircleDashedCheck,
  IconCreditCard,
  IconMessage2,
  IconPhone,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";

export const SkeletonTwo = () => {
  return (
    <div
      className="flex-1 rounded-t-3xl gap-2 flex items-center justify-center w-full h-full absolute inset-x-0 p-2"
      style={{ transform: "rotateY(20deg) rotateX(20deg) rotateZ(-20deg)" }}
    >
      <Circle className="flex items-center justify-center border-neutral-200 shadow-sm">
        <LogoIcon className="size-10 text-neutral-400" />

        {/* Google Calendar */}
        <RevolvingCard className="[--initial-position:0deg] [--translate-position:130px] [--orbit-duration:18s] bg-white">
          <IconCalendarCheck className="size-8 text-teal-500" />
        </RevolvingCard>

        {/* Google Reviews */}
        <RevolvingCard className="[--initial-position:72deg] [--translate-position:160px] [--orbit-duration:22s] bg-white">
          <IconBrandGoogle className="size-8 text-blue-500" />
        </RevolvingCard>

        {/* Square / Payments */}
        <RevolvingCard className="[--initial-position:144deg] [--translate-position:180px] [--orbit-duration:14s] bg-white">
          <IconCreditCard className="size-8 text-neutral-700" />
        </RevolvingCard>

        {/* SMS / Messaging */}
        <RevolvingCard className="[--initial-position:216deg] [--translate-position:200px] [--orbit-duration:26s] bg-white">
          <IconMessage2 className="size-8 text-green-500" />
        </RevolvingCard>

        {/* Phone / Calls */}
        <RevolvingCard className="[--initial-position:288deg] [--translate-position:220px] [--orbit-duration:30s] bg-white">
          <IconPhone className="size-8 text-amber-500" />
        </RevolvingCard>

        {/* Floating card: Booking confirmed */}
        <RevolvingCard className="[--initial-position:30deg] [--translate-position:260px] [--orbit-duration:35s] size-auto ring-0 shadow-none bg-transparent w-56">
          <SkeletonCard
            className="absolute bottom-0 left-8 max-w-[90%] z-30 bg-white"
            icon={<IconCircleDashedCheck className="size-4 text-teal-500" />}
            title="Booking confirmed"
            description="Sarah M. · Thursday 10 AM"
          />
        </RevolvingCard>

        {/* Floating card: Review request sent */}
        <RevolvingCard className="[--initial-position:200deg] [--translate-position:240px] [--orbit-duration:28s] size-auto ring-0 shadow-none bg-transparent w-56">
          <SkeletonCard
            className="absolute bottom-0 left-8 max-w-[90%] z-30 bg-white"
            icon={<IconCircleDashedCheck className="size-4 text-amber-500" />}
            title="Review request sent"
            description="5-star received on Google"
          />
        </RevolvingCard>
      </Circle>
      <Circle className="shadow border-neutral-100 size-60 bg-neutral-100/80 z-[9] relative"></Circle>
      <Circle className="shadow border-neutral-100 size-80 bg-neutral-100/60 z-[8]"></Circle>
      <Circle className="shadow border-neutral-100 size-100 bg-neutral-100/40 z-[7]"></Circle>
      <Circle className="shadow border-neutral-100 size-120 bg-neutral-100/20 z-[6]"></Circle>
    </div>
  );
};

const SkeletonCard = ({
  icon,
  title,
  description,
  className,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "max-w-[85%] h-fit my-auto bg-transparent mx-auto w-full p-3 rounded-2xl border border-neutral-200 shadow-2xl",
        className
      )}
    >
      <div className="flex gap-3 items-center">
        {icon}
        <p className="text-xs font-semibold text-neutral-800">{title}</p>
      </div>
      {description && (
        <p className="text-[10px] text-neutral-500 font-normal mt-2">{description}</p>
      )}
    </div>
  );
};

const RevolvingCard = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "size-10 flex absolute inset-0 m-auto items-center justify-center bg-white border border-transparent shadow-black/10 ring-1 ring-black/10 rounded-sm animate-orbit [--translate-position:120px] [--orbit-duration:10s]",
        className
      )}
    >
      {children}
    </div>
  );
};

const Circle = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "size-40 bg-white absolute inset-0 shrink-0 border z-[10] border-transparent rounded-full m-auto",
        className
      )}
    >
      {children}
    </div>
  );
};
