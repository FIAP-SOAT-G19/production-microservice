import { Order } from '../../domain/models/order'

export interface IGetOrderByNumberUseCase {
  execute: (orderNumber: string) => Promise<Order>
}
