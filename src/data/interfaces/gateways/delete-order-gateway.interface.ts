import { Order } from '../../../domain/entities/order.types'

export interface IDeleteOrderGateway {
  deleteOrder: (orderNumber: string) => Promise<void>
  getOrderByNumber: (orderNumber: string) => Promise<Order>
}
