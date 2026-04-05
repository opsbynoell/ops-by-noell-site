import { cn } from "@/lib/utils";
import { IconCalendar, IconMessage, IconPhone, IconStar } from "@tabler/icons-react";
import { motion, useInView } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const SkeletonOne = () => {
  type Item = {
    title: string;
    topIcon: React.ReactNode;
    iconBg: string;
    description: string;
    tags: { text: string; color: string }[];
  };

  const items: Item[] = [
    {
      title: "Missed call text-back",
      topIcon: <IconPhone className="size-4 text-white" />,
      iconBg: "bg-teal-500",
      description: "Sarah called while you were with a client. Text sent in 12 seconds.",
      tags: [
        { text: "Auto-sent", color: "bg-teal-50 text-teal-700 border-teal-200" },
        { text: "Booking link included", color: "bg-neutral-100 text-neutral-600 border-neutral-200" },
      ],
    },
    {
      title: "Appointment confirmed",
      topIcon: <IconCalendar className="size-4 text-white" />,
      iconBg: "bg-blue-500",
      description: "Jennifer L. confirmed for Friday 2 PM via the booking link in her text.",
      tags: [
        { text: "Booked", color: "bg-green-50 text-green-700 border-green-200" },
        { text: "Square synced", color: "bg-neutral-100 text-neutral-600 border-neutral-200" },
      ],
    },
    {
      title: "Review request sent",
      topIcon: <IconStar className="size-4 text-white" />,
      iconBg: "bg-amber-500",
      description: "Maria's appointment ended 30 minutes ago. Google review request sent.",
      tags: [
        { text: "5-star received", color: "bg-amber-50 text-amber-700 border-amber-200" },
        { text: "Google", color: "bg-neutral-100 text-neutral-600 border-neutral-200" },
      ],
    },
  ];

  const [activeCards, setActiveCards] = useState<Item[] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setActiveCards((prev) => {
        if (!prev) return [items[0]];
        if (prev.length >= items.length) { clearInterval(interval); return prev; }
        return [items[prev.length], ...prev];
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <motion.div
      ref={ref}
      layout
      className="flex-1 rounded-t-3xl gap-2 flex flex-col bg-neutral-100 border border-neutral-200 max-w-[20rem] lg:max-w-sm mx-auto w-full h-full absolute inset-x-0 p-2"
    >
      {activeCards?.map((item) => (
        <Card key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

const Card = ({
  topIcon,
  iconBg,
  title,
  description,
  tags,
}: {
  topIcon: React.ReactNode;
  iconBg: string;
  title: string;
  description: string;
  tags: { text: string; color: string }[];
}) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className="p-4 shadow-black/10 gap-4 border bg-white border-transparent ring-1 rounded-[16px] ring-black/10 flex items-start"
    >
      <div className={cn("size-6 shrink-0 rounded-full flex mt-1 items-center justify-center", iconBg)}>
        {topIcon}
      </div>
      <div>
        <p className="md:text-base font-bold text-neutral-800">{title}</p>
        <p className="text-xs md:text-sm text-neutral-600 text-balance mt-1">{description}</p>
        <div className="mt-2 flex flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <Tag key={tag.text} text={tag.text} colorClass={tag.color} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Tag = ({ text, colorClass }: { text: string; colorClass: string }) => {
  return (
    <div className={cn("flex items-center gap-1 w-fit rounded-sm px-2 py-0.5 border text-xs font-medium", colorClass)}>
      {text}
    </div>
  );
};
