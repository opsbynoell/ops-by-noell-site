import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";

export default function TermsPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <Container className="max-w-3xl mx-auto">
        <Heading as="h1">Terms of Service</Heading>
        <Subheading className="mt-4">
          Last updated: {new Date().getFullYear()}
        </Subheading>
        <div className="mt-12 p-10 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
          <p className="text-neutral-500 dark:text-neutral-400">
            Terms of service content coming soon. For questions, contact{" "}
            <a
              href="mailto:hello@opsbynoell.com"
              className="text-neutral-900 dark:text-neutral-100 hover:underline"
            >
              hello@opsbynoell.com
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
