import { notFound } from "next/navigation";
import { PARTYKIT_URL } from "@/app/env";
import Counter from "@/components/Counter";

export default async function Home() {
  const req = await fetch(`${PARTYKIT_URL}/party/counter`, {
    method: "GET",
    next: {
      revalidate: 0,
    },
  });

  if (!req.ok) {
    if (req.status === 404) {
      notFound();
    } else {
      throw new Error("Something went wrong.");
    }
  }

  const { count } = (await req.json()) as {
    count: number;
  };

  return <Counter count={count} />;
}
