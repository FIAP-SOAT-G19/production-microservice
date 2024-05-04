import { Order } from '../../domain/models/order'

export interface ICreateOrderGateway {
  saveOrder: (input: Order) => Promise<Order>
  sendMessage: (input: Order) => Promise<void>
}
