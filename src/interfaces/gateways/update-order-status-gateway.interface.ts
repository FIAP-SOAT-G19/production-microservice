import { OrderOutput } from '../'

export interface IUpdateOrderStatusGateway {
  updateStatus: (id: string, status: string) => Promise<OrderOutput>
  // getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
}
