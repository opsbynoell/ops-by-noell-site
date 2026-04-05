"use client";
import React from "react";
import { motion } from "motion/react";

const industries = [
  "Massage Therapy",
  "Med Spas",
  "Salons",
  "Estheticians",
  "Dental Practices",
  "Home Services",
];

export const LogoCloud = () => {
  return (
    <section className="pb-10 md:pb-16">
      <h2 className="text-neutral-600 font-medium dark:text-neutral-400 text-lg text-center max-w-xl mx-auto px-4">
        Built for appointment-based businesses in Orange County
      </h2>
      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto mt-8 px-4">
        {industries.map((label, index) => (
          <motion.div
            initial={{
              y: -10,
              opacity: 0,
              filter: "blur(10px)",
            }}
            whileInView={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              delay: index * 0.08,
            }}
            viewport={{ once: true }}
            key={label}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium text-neutral-600 dark:text-neutral-300">
              {label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
