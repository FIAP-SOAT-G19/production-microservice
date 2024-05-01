// import { ReceivedMessage } from "../../../domain/models/receivedMessage";

export interface IQueueConsumer {
    execute: () => Promise<void>
}