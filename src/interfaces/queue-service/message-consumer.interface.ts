import { ReceivedMessage } from '../../domain/models/receivedMessage';

export interface IMessageConsumer {
    execute: () => Promise<ReceivedMessage>
}