import { StringCodec, connect } from "nats";
import { NatsService } from "../services/nats.service";

export const Publisher = new NatsService(["nats://nats:4222"]);