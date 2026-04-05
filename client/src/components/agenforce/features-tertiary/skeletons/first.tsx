import { cn } from "@/lib/utils";
import { IconActivity, IconBell, IconCalendar, IconMessage, IconPhone, IconStar } from "@tabler/icons-react";
import { motion } from "framer-motion";
import React from "react";

const activityItems = [
  {
    icon: <IconCalendar className="size-3 text-white" />,
    iconBg: "bg-teal-500",
    title: "New booking: Sarah M.",
    description: "Thursday 10:00 AM — 60-min deep tissue",
    badge: { text: "Confirmed", className: "bg-green-50 border-green-200 text-green-600" },
  },
  {
    icon: <IconStar className="size-3 text-white" />,
    iconBg: "bg-amber-500",
    title: "Review received: 5 stars",
    description: 'Jennifer L. · "Best massage I\'ve had in years."',
    badge: { text: "Google", className: "bg-amber-50 border-amber-200 text-amber-600" },
  },
  {
    icon: <IconPhone className="size-3 text-white" />,
    iconBg: "bg-blue-500",
    title: "Missed call recovered",
    description: "Text sent in 8 sec · Maria booked for Friday",
    badge: { text: "Recovered", className: "bg-blue-50 border-blue-200 text-blue-600" },
  },
  {
    icon: <IconMessage className="size-3 text-white" />,
    iconBg: "bg-purple-500",
    title: "Reactivation: Client returned",
    description: "Danielle B. — last visit 90 days ago",
    badge: { text: "Rebooked", className: "bg-purple-50 border-purple-200 text-purple-600" },
  },
  {
    icon: <IconBell className="size-3 text-white" />,
    iconBg: "bg-rose-500",
    title: "No-show follow-up sent",
    description: "Kristina S. — offered reschedule link",
    badge: { text: "Processing", className: "bg-rose-50 border-rose-200 text-rose-600" },
  },
  {
    icon: <IconCalendar className="size-3 text-white" />,
    iconBg: "bg-teal-500",
    title: "Confirmation: Rachel T.",
    description: "Tomorrow 2:00 PM — confirmed via text",
    badge: { text: "Confirmed", className: "bg-green-50 border-green-200 text-green-600" },
  },
  {
    icon: <IconStar className="size-3 text-white" />,
    iconBg: "bg-amber-500",
    title: "Review received: 5 stars",
    description: 'Tracy W. · "Absolutely amazing experience."',
    badge: { text: "Google", className: "bg-amber-50 border-amber-200 text-amber-600" },
  },
];

export const SkeletonOne = () => {
  return (
    <div className="flex-1 rounded-t-3xl gap-2 flex flex-col bg-neutral-100 border border-neutral-200 mx-auto w-full h-full absolute inset-x-10 inset-y-2 pt-2 px-2">
      <Card>
        {activityItems.map((item, idx) => (
          <motion.div
            key={item.title + idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="w-full"
          >
            <CardItem {...item} index={idx} />
          </motion.div>
        ))}
      </Card>
    </div>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="shadow-black/10 gap-4 border bg-white border-transparent ring-1 rounded-tl-[16px] ring-black/10 flex flex-col items-start flex-1">
      <div className="flex items-center gap-2 border-b w-full py-2 px-4">
        <IconActivity className="size-4 text-teal-500" />
        <p className="text-sm font-bold text-neutral-800">System Activity</p>
      </div>
      {children}
    </div>
  );
};

const CardItem = ({
  icon,
  iconBg,
  title,
  description,
  badge,
  index,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  badge: { text: string; className: string };
  index: number;
}) => {
  return (
    <div className="flex justify-between items-center w-full pl-4 relative overflow-hidden gap-2">
      <div className="items-center gap-2 flex shrink-0">
        <div className={cn("size-5 rounded-sm flex items-center justify-center text-white shrink-0", iconBg)}>
          {icon}
        </div>
        <div className={cn("px-1.5 py-0.5 rounded border text-[10px] font-bold shrink-0", badge.className)}>
          {badge.text}
        </div>
      </div>
      <motion.p className="text-xs text-neutral-500 flex-1 whitespace-nowrap overflow-hidden text-ellipsis">
        <span className="font-semibold text-neutral-700">{title}</span>
        {" · "}
        {description.split("").map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: i * 0.008 + index * 0.08 }}
          >
            {char}
          </motion.span>
        ))}
      </motion.p>
    </div>
  );
};
