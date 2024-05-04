import { OrderStatus, Order } from '../../domain/models/order'

export interface IUpdateOrderStatusUseCase {
  execute: (id: string, status: OrderStatus) => Promise<Order>
}
