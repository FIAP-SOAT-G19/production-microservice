import { Order } from '../../domain/models/order';

export interface IMessageProducer {
    execute: (orderData: Order) => Promise<void>
}