import type * as Party from "partykit/server";

export default class Server implements Party.Server {
  private count = 0;

  constructor(readonly party: Party.Party) {}

  async onStart() {
    this.count = (await this.party.storage.get<number>("count")) || 0;
  }

  private async saveCount() {
    await this.party.storage.put<number>("count", this.count);

    // Set an alarm to reset the count after 5 minutes of inactivity.
    this.party.storage.setAlarm(Date.now() + 5 * 60 * 1000);
  }

  private resetCount() {
    this.count = 0;
    void this.saveCount();
  }

  onAlarm() {
    this.resetCount();
  }

  async onRequest(req: Party.Request) {
    if (req.method === "POST") {
      this.resetCount();
    }

    if (req.method === "GET") {
      return new Response(JSON.stringify({ count: this.count }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Not found", { status: 404 });
  }

  async onMessage(message: string) {
    const event = JSON.parse(message);

    if (event.type === "increment") {
      this.count += 1;
      this.party.broadcast(JSON.stringify({ count: this.count }));
      void this.saveCount();
    }
  }
}

Server satisfies Party.Worker;
