import { Order } from '../../../domain/entities/order.types'

export interface ICreateOrderGateway {
  saveOrder: (input: Order) => Promise<Order>
  sendToQueue: (input: Order) => Promise<void>
}
