import { Order } from "../../../domain/entities/order.types";

export interface IMessageProducer {
    execute: (orderData: Order) => Promise<void>
}