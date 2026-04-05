import { Container } from "@/components/container";
import { Heading } from "@/components/heading";
import { Subheading } from "@/components/subheading";

export default function BookPage() {
  return (
    <div className="min-h-screen py-16 md:py-24">
      <Container className="max-w-2xl mx-auto text-center">
        <Subheading className="mx-auto">Free Audit</Subheading>
        <Heading as="h1" className="mt-4">
          Book Your Free Audit
        </Heading>
        <Subheading className="mt-4 mx-auto">
          In 30 minutes, we show you your numbers. No pitch. No slides. Just the
          data.
        </Subheading>

        <div className="mt-12 p-10 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 flex flex-col items-center gap-4">
          <p className="text-neutral-500 dark:text-neutral-400 text-sm">
            Scheduling widget coming soon. Reach us directly at:
          </p>
          <a
            href="mailto:hello@opsbynoell.com"
            className="text-lg font-medium text-neutral-900 dark:text-neutral-100 hover:underline"
          >
            hello@opsbynoell.com
          </a>
        </div>
      </Container>
    </div>
  );
}
