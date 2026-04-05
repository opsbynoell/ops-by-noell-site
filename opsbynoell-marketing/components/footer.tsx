import React from "react";
import { Logo } from "./logo";
import { Container } from "./container";
import { Subheading } from "./subheading";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { ModeToggle } from "./mode-toggle";

export const Footer = () => {
  const links = [
    { title: "How It Works", href: "/#features" },
    { title: "Results", href: "/#outcomes" },
    { title: "About", href: "/#about" },
    { title: "Pricing", href: "/pricing" },
    { title: "Book Free Audit", href: "/book" },
  ];

  return (
    <footer className="border-t perspective-distant overflow-hidden border-neutral-200 dark:border-neutral-800 py-10 md:py-20 lg:py-32 relative">
      <Container className="grid grid-cols-1 lg:grid-cols-3 gap-10 relative z-20">
        <div className="lg:col-span-1 flex flex-col gap-4 items-start">
          <Logo />
          <Subheading>
            Automation for appointment-based businesses in Orange County.
          </Subheading>
          <p className="text-sm text-neutral-500">
            hello@opsbynoell.com
            <br />
            Orange County, CA
          </p>
          <Button asChild className="shadow-brand mt-2">
            <Link href="/book">Book Free Audit</Link>
          </Button>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-medium text-neutral-400">Navigate</h4>
          <ul className="list-none flex flex-col gap-2">
            {links.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.href}
                  className="text-neutral-600 text-sm hover:text-black dark:text-neutral-400 dark:hover:text-white transition duration-200"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-base font-medium text-neutral-400">Legal</h4>
          <ul className="list-none flex flex-col gap-2">
            <li>
              <Link
                href="/privacy"
                className="text-neutral-600 text-sm hover:text-black dark:text-neutral-400 dark:hover:text-white transition duration-200"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-neutral-600 text-sm hover:text-black dark:text-neutral-400 dark:hover:text-white transition duration-200"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      <Container className="flex flex-col sm:flex-row justify-between mt-10 relative z-20 gap-4 md:gap-0">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Ops by Noell. All rights reserved.
        </p>

        <div className="flex md:items-end items-start flex-col gap-4">
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/" aria-label="Twitter">
              <IconBrandTwitter className="size-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200" />
            </Link>
            <Link href="/" aria-label="Instagram">
              <IconBrandInstagram className="size-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200" />
            </Link>
            <Link href="/" aria-label="LinkedIn">
              <IconBrandLinkedin className="size-4 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors duration-200" />
            </Link>
          </div>
        </div>
      </Container>

      <div
        className={cn(
          "flex items-center justify-center gap-20 h-[200%]",
          "absolute -inset-x-[150%] -inset-y-40",
          "[background-size:40px_40px]",
          "[background-image:linear-gradient(to_right,var(--color-neutral-100)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-100)_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,var(--color-neutral-900)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-neutral-900)_1px,transparent_1px)]",
          "mask-radial-from-50%"
        )}
        style={{
          transform: "rotateX(60deg)",
        }}
      />
    </footer>
  );
};
