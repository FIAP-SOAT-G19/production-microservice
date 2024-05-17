import { OrderOutput } from '../'

export interface IDeleteOrderGateway {
  getOrderByNumber: (orderNumber: string) => Promise<OrderOutput>
  deleteOrder: (orderNumber: string) => Promise<void>
}
