"use client";
import React, { useState } from "react";
import { Logo } from "./logo";
import { Container } from "./container";
import Link from "next/link";
import { Button } from "./ui/button";
import { IconLayoutSidebar, IconX, IconChevronDown } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";

const navlinks = [
  {
    title: "How It Works",
    href: "/#features",
  },
  {
    title: "Results",
    href: "/#outcomes",
  },
  {
    title: "About",
    href: "/#about",
  },
  {
    title: "Pricing",
    href: "/pricing",
  },
];

const industries = [
  { title: "Massage Therapists", href: "/#features" },
  { title: "Med Spas", href: "/#features" },
  { title: "Salons", href: "/#features" },
  { title: "Dental Offices", href: "/#features" },
  { title: "Home Services", href: "/#features" },
];

export const Navbar = () => {
  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <DesktopNavbar />
      <MobileNavbar />
    </div>
  );
};

export const MobileNavbar = () => {
  const [open, setOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  return (
    <div className="flex md:hidden px-4 py-2 justify-between relative">
      <Logo />
      <button onClick={() => setOpen(!open)}>
        <IconLayoutSidebar className="size-4" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(15px)",
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)",
            }}
            transition={{
              duration: 0.2,
            }}
            className="fixed inset-0 h-full w-full z-50 px-4 py-1.5 flex flex-col justify-between bg-background/95"
          >
            <div>
              <div className="flex justify-between py-2">
                <Logo />
                <button onClick={() => setOpen(false)}>
                  <IconX />
                </button>
              </div>

              <div className="flex flex-col gap-6 my-10">
                {navlinks.map((item, index) => (
                  <motion.div
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    key={index + item.title}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="text-2xl text-neutral-600 dark:text-neutral-400 font-medium"
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2, delay: navlinks.length * 0.1 }}
                >
                  <button
                    onClick={() => setIndustriesOpen(!industriesOpen)}
                    className="text-2xl text-neutral-600 dark:text-neutral-400 font-medium flex items-center gap-2"
                  >
                    Industries
                    <IconChevronDown
                      className={`size-5 transition-transform duration-200 ${industriesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {industriesOpen && (
                    <div className="flex flex-col gap-3 mt-4 pl-4">
                      {industries.map((ind) => (
                        <Link
                          key={ind.title}
                          href={ind.href}
                          onClick={() => setOpen(false)}
                          className="text-lg text-neutral-500 dark:text-neutral-400"
                        >
                          {ind.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
            <div className="pb-6">
              <Button asChild className="w-full">
                <Link href="/book" onClick={() => setOpen(false)}>
                  Book Free Audit
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const DesktopNavbar = () => {
  const [industriesOpen, setIndustriesOpen] = useState(false);
  return (
    <Container className="py-4 items-center justify-between hidden lg:flex">
      <Logo />
      <div className="flex items-center gap-8">
        {navlinks.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className="text-sm text-neutral-600 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200"
          >
            {item.title}
          </Link>
        ))}
        <div className="relative">
          <button
            onMouseEnter={() => setIndustriesOpen(true)}
            onMouseLeave={() => setIndustriesOpen(false)}
            className="text-sm text-neutral-600 dark:text-neutral-400 font-medium hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200 flex items-center gap-1"
          >
            Industries
            <IconChevronDown className="size-3.5" />
          </button>
          <AnimatePresence>
            {industriesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                onMouseEnter={() => setIndustriesOpen(true)}
                onMouseLeave={() => setIndustriesOpen(false)}
                className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-lg z-50 overflow-hidden"
              >
                {industries.map((ind) => (
                  <Link
                    key={ind.title}
                    href={ind.href}
                    className="block px-4 py-2.5 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors duration-150"
                  >
                    {ind.title}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button asChild>
          <Link href="/book">Book Free Audit</Link>
        </Button>
      </div>
    </Container>
  );
};
