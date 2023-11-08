"use client";

import { PARTYKIT_HOST } from "@/app/env";
import usePartySocket from "partysocket/react";
import { useState } from "react";

function CurrentCount({ count }: { count: number }) {
  return <div>Updates caused: {count}</div>;
}

const synonyms = [
  "Recharging",
  "Refilling",
  "Restocking",
  "Provisioning",
  "Renewing",
  "Rethinking life",
  "U'r doing great",
  "Keep going",
  "Enough, init?",
  "Great job",
  "Proud of you",
  "Good work",
  "You clicked",
  "You missed, JK!",
  "Click of the year",
  "Get a cookie",
  "Much wow",
  "What have I done",
];

function IncrementButton({ onClick }: { onClick: () => void }) {
  const [recharging, setRecharging] = useState<string | null>(null);
  const preventOnClick = Boolean(recharging);

  const onClickWithPreventing = () => {
    if (preventOnClick) return;

    onClick();
    setRecharging(synonyms[Math.floor(Math.random() * synonyms.length)]);
    setTimeout(() => setRecharging(null), 1_000);
  };

  return (
    <button className={"button m-20"} onClick={onClickWithPreventing}>
      {preventOnClick ? (
        recharging + "..."
      ) : (
        <>
          Cause an update!!!
          {Array.from({ length: 6 }, (v, i) => (
            <div key={`parrot-${i}`} className={"parrot"} />
          ))}
        </>
      )}
    </button>
  );
}

export default function Counter({ count: initialCount }: { count: number }) {
  const [count, setCount] = useState<number>(initialCount ?? 0);

  const socket = usePartySocket({
    host: PARTYKIT_HOST,
    room: "counter",
    onMessage(event) {
      const { count } = JSON.parse(event.data) as { count: number };
      setCount(count);
    },
  });

  const sendIncrement = () => {
    socket.send(JSON.stringify({ type: "increment" }));
  };

  return (
    <div>
      <div className="relative bg-white w-full h-auto p-8 rounded-xl shadow-xl">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-bold">
            <CurrentCount count={count} />
          </h1>
        </div>
      </div>

      <IncrementButton onClick={sendIncrement} />
    </div>
  );
}
