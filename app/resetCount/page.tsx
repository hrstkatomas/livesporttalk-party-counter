import { redirect } from "next/navigation";
import { PARTYKIT_URL } from "../env";

export default async function CountResetor() {
  await fetch(`${PARTYKIT_URL}/party/counter`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  redirect("/");
}
