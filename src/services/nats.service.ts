import { connect, NatsConnection, Payload } from "nats";

class NatsService {
  private nc: NatsConnection;

  constructor(private readonly servers: string[]) {}

  async connect() {
    this.nc = await connect({
      servers: this.servers,
    });
    
  }

  async publish(subject: string, data: Payload) {
    await this.nc.publish(subject, data);
  }
}
export { NatsService };
