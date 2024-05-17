import { OrderOutput } from '../'

export interface IGetOrderByNumberGateway {
  getOrderByNumber: (orderNumber: string) => Promise<OrderOutput>
}
