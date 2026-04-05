import { cn } from "@/lib/utils";
import {
  IconBell,
  IconCalendarCheck,
  IconMessage,
  IconPhone,
  IconStar,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const SkeletonFour = () => {
  const items = [
    {
      title: "Missed Call Text-Back",
      icon: <IconPhone className="size-4 text-teal-600" />,
      className: "bg-teal-50 border border-teal-200 text-teal-700",
      status: "Active",
      statusClass: "bg-teal-500",
      description:
        "Missed calls trigger an instant personalized text with a booking link. 85% of callers don't call back after voicemail.",
      details: "Avg. response: 8 seconds · Last triggered: 4 min ago",
    },
    {
      title: "Review Autopilot",
      icon: <IconStar className="size-4 text-amber-600" />,
      className: "bg-amber-50 border border-amber-200 text-amber-700",
      status: "Monitoring",
      statusClass: "bg-amber-500",
      description:
        "Timed review requests fire after every completed appointment. Happy clients become your loudest advocates on Google.",
      details: "40+ reviews generated · Last sent: 2 hours ago",
    },
    {
      title: "No-Show Recovery",
      icon: <IconBell className="size-4 text-rose-600" />,
      className: "bg-rose-50 border border-rose-200 text-rose-700",
      status: "Responding",
      statusClass: "bg-rose-500",
      description:
        "Automated follow-up sequences chase no-shows and offer reschedule links before they're gone for good.",
      details: "<1 no-show/week vs. 4/week before · 78% reschedule rate",
    },
    {
      title: "Smart Scheduling",
      icon: <IconCalendarCheck className="size-4 text-blue-600" />,
      className: "bg-blue-50 border border-blue-200 text-blue-700",
      status: "Active",
      statusClass: "bg-blue-500",
      description:
        "24/7 AI that fields inquiries, answers questions, and books appointments. Works while you sleep.",
      details: "Bookings handled overnight: 3 this week",
    },
    {
      title: "Reactivation",
      icon: <IconMessage className="size-4 text-purple-600" />,
      className: "bg-purple-50 border border-purple-200 text-purple-700",
      status: "Scheduled",
      statusClass: "bg-purple-500",
      description:
        "Targeted sequences re-engage past clients who've gone quiet. One send typically recovers 8–12 lapsed clients.",
      details: "Next campaign: Mon 9 AM · 47 clients in queue",
    },
  ];

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentIndexRef = useRef(0);
  const [selected, setSelected] = useState(items[0]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, []);

  const startAutoplay = () => {
    stopAutoplay();
    intervalRef.current = setInterval(() => {
      currentIndexRef.current = (currentIndexRef.current + 1) % items.length;
      setSelected(items[currentIndexRef.current]);
    }, 2200);
  };

  const stopAutoplay = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  return (
    <div>
      <div className="flex gap-2 items-center justify-center max-w-lg mx-auto flex-wrap mb-4">
        {items.map((item) => (
          <button
            key={item.title}
            onClick={() => { stopAutoplay(); setSelected(item); }}
            className={cn(
              "px-2 py-1 rounded-sm relative text-xs gap-1 cursor-pointer active:scale-98 transition duration-200 flex items-center justify-center opacity-40 font-medium",
              selected.title === item.title && "opacity-100",
              item.className
            )}
          >
            {selected.title === item.title && (
              <motion.div
                layoutId="selected-system"
                className="absolute inset-0 rounded-[5px] shadow-inner"
              />
            )}
            {item.icon}
            {item.title}
          </button>
        ))}
      </div>
      <div className="flex-1 rounded-t-3xl gap-2 flex flex-col bg-neutral-100 border border-neutral-200 max-w-[20rem] lg:max-w-sm mx-auto w-full h-full absolute inset-x-0 p-2">
        <SystemCard
          icon={selected.icon}
          iconClassName={selected.className}
          title={selected.title}
          status={selected.status}
          statusClass={selected.statusClass}
          description={selected.description}
          details={selected.details}
        />
      </div>
    </div>
  );
};

const SystemCard = ({
  icon,
  iconClassName,
  title,
  status,
  statusClass,
  description,
  details,
}: {
  icon: React.ReactNode;
  iconClassName?: string;
  title: string;
  status: string;
  statusClass: string;
  description: string;
  details: string;
}) => {
  return (
    <motion.div
      key={title}
      className="p-4 shadow-black/10 gap-4 border bg-white border-transparent ring-1 rounded-[16px] ring-black/10 flex items-start flex-col"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn("size-7 shrink-0 rounded-lg flex items-center justify-center", iconClassName)}
          >
            {icon}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.1 }}
            className="text-base font-bold text-neutral-800"
          >
            {title}
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-1.5"
        >
          <div className={cn("size-2 rounded-full", statusClass)}></div>
          <span className="text-xs font-medium text-neutral-500">{status}</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-full"
      >
        <p className="text-sm text-neutral-600 leading-relaxed">
          {description}
        </p>
        <p className="text-xs text-neutral-400 mt-2 border-t border-neutral-100 pt-2">
          {details}
        </p>
      </motion.div>
    </motion.div>
  );
};
