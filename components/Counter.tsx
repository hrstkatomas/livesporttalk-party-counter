"use client";

import { PARTYKIT_HOST } from "@/app/env";
import usePartySocket from "partysocket/react";
import { useState } from "react";

function CurrentCount({ count }: { count: number }) {
  return <div>Updates caused: {count}</div>;
}

function IncrementButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={"button m-20"} onClick={onClick}>
      Cause an update!!!
      {Array.from({ length: 6 }, (v, i) => (
        <div key={`parrot-${i}`} className={"parrot"} />
      ))}
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
