import { cn } from "@/lib/utils";
import {
  IconCheck,
  IconLoader2,
  IconRipple,
  IconStar,
} from "@tabler/icons-react";
import React from "react";

export const SkeletonTwo = () => {
  return (
    <div
      style={{ transform: "rotateY(20deg) rotateX(20deg) rotateZ(-20deg)" }}
      className={cn(
        "max-w-[85%] group h-full my-auto bg-neutral-100 mx-auto w-full p-3 rounded-2xl border border-neutral-300 shadow-2xl flex flex-col mask-radial-from-50% mask-b-from-50%",
        "translate-x-10",
        "[--pattern-fg:var(--color-neutral-950)]/5"
      )}
    >
      <div className="flex gap-3 items-center">
        <IconStar className="size-4 text-amber-500 fill-amber-400" />
        <p className="text-sm font-semibold text-neutral-800">
          Review Autopilot
        </p>
      </div>
      <div className="relative flex-1 bg-neutral-200 mt-4 border border-neutral-200 rounded-2xl">
        <Pattern />
        <div className="absolute rounded-2xl translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:-translate-y-0 transition-all duration-300 inset-0 bg-white h-full w-full">
          <Row icon={<IconCheck className="size-3 stroke-white fill-green-500" />} text="Appointment completed" time="2s" />
          <GradientHr />
          <Row icon={<IconCheck className="size-3 stroke-white fill-green-500" />} text="Review request sent" time="30m" />
          <GradientHr />
          <Row icon={<IconCheck className="size-3 stroke-white fill-amber-500" />} text="5-star review received" time="4h" variant="success" starRow />
          <GradientHr />
          <Row icon={<IconCheck className="size-3 stroke-white fill-green-500" />} text="Published to Google" time="4h" />
          <GradientHr />
          <Row icon={<IconLoader2 className="size-3 text-white animate-spin" />} text="Next request queued" time="tmrw" variant="warning" />
        </div>
      </div>
    </div>
  );
};

const GradientHr = () => {
  return (
    <div className="h-px w-full bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
  );
};

const Row = ({
  icon,
  text,
  time,
  variant = "success",
  starRow,
}: {
  icon: React.ReactNode;
  text: string;
  time: string;
  variant?: "success" | "warning";
  starRow?: boolean;
}) => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "size-4 flex items-center justify-center rounded-full",
            variant === "success" && "bg-green-500",
            variant === "warning" && "bg-amber-500"
          )}
        >
          {icon}
        </div>
        <p className="text-neutral-600 font-medium text-xs md:text-sm">{text}</p>
        {starRow && (
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <IconStar key={i} className="size-2.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-1 text-neutral-400">
        <IconRipple className="size-3" />
        <p className="text-[10px] font-bold">{time}</p>
      </div>
    </div>
  );
};

const Pattern = () => {
  return (
    <div className="absolute inset-0 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:10px_10px] bg-fixed rounded-2xl"></div>
  );
};
