import { Container } from "@/components/Container";
import { Button } from "@/components/Button";

const messages: Record<string, { title: string; body: string }> = {
  approve: {
    title: "Review approved",
    body: "Thank you — this review has been published on the site.",
  },
  reject: {
    title: "Review rejected",
    body: "This review has been rejected and will not be published.",
  },
  already: {
    title: "Already reviewed",
    body: "This review has already been decided on.",
  },
  invalid: {
    title: "Link not valid",
    body: "This link is invalid or has expired.",
  },
};

export default async function ReviewDecisionPage(props: PageProps<"/review-decision">) {
  const params = await props.searchParams;
  const result = typeof params.result === "string" ? params.result : "invalid";
  const message = messages[result] ?? messages.invalid;

  return (
    <section className="py-32">
      <Container className="max-w-md text-center">
        <h1 className="text-3xl text-navy">{message.title}</h1>
        <p className="mt-4 text-muted">{message.body}</p>
        <Button href="/reviews" variant="secondary" className="mt-8">
          View Reviews
        </Button>
      </Container>
    </section>
  );
}
