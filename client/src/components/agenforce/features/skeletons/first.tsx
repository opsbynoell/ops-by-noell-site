import { cn } from "@/lib/utils";
import { IconCalendar, IconCheck, IconClock, IconPhone } from "@tabler/icons-react";
import React from "react";

export const SkeletonOne = () => {
  return (
    <div className="perspective-distant rotate-z-15 -rotate-y-20 rotate-x-30 scale-[1.2] h-full w-full -translate-y-10 mask-radial-from-50% mask-r-from-50%">
      <BookingCard
        className="absolute bottom-0 left-12 max-w-[90%] z-30"
        icon={<IconCalendar className="size-4 text-white" />}
        iconBg="bg-teal-500"
        title="New booking: Sarah M."
        detail="Thursday 10:00 AM · 60-min massage"
        badge={<Badge text="Confirmed" variant="success" />}
      />
      <BookingCard
        className="absolute bottom-8 left-8 z-20"
        icon={<IconPhone className="size-4 text-white" />}
        iconBg="bg-amber-500"
        title="Missed call recovered"
        detail="Text sent · 3 min after missed call"
        badge={<Badge text="Replied" variant="warning" />}
      />
      <BookingCard
        className="absolute bottom-20 left-4 max-w-[80%] z-10"
        icon={<IconCheck className="size-4 text-white" />}
        iconBg="bg-green-500"
        title="No-show follow-up sent"
        detail="Jennifer L. · Rescheduled for Friday"
        badge={<Badge text="Recovered" variant="success" />}
      />
    </div>
  );
};

const BookingCard = ({
  icon,
  iconBg,
  title,
  detail,
  badge,
  className,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  detail: string;
  badge: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "max-w-[85%] h-fit my-auto bg-white mx-auto w-full p-3 rounded-2xl border border-neutral-200 shadow-2xl",
        className
      )}
    >
      <div className="flex gap-3 items-center">
        <div className={cn("size-7 rounded-lg flex items-center justify-center shrink-0", iconBg)}>
          {icon}
        </div>
        <p className="text-xs md:text-sm font-semibold text-neutral-800 flex-1">
          {title}
        </p>
        {badge}
      </div>
      <p className="text-[10px] md:text-xs text-neutral-500 font-normal mt-2 pl-10">
        {detail}
      </p>
    </div>
  );
};

const Badge = ({
  variant = "success",
  text,
}: {
  variant?: "success" | "warning";
  text: string;
}) => {
  return (
    <div
      className={cn(
        "px-2 py-0.5 rounded-full flex border items-center gap-1 w-fit text-[10px] font-bold shrink-0",
        variant === "success" && "bg-green-50 border-green-200 text-green-600",
        variant === "warning" && "bg-amber-50 border-amber-200 text-amber-600"
      )}
    >
      <IconClock className="size-3" />
      {text}
    </div>
  );
};
