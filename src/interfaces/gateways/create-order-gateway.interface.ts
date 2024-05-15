import { Order } from '@/domain/models/order'

export interface ICreateOrderGateway {
  saveOrder: (input: Order) => Promise<Order>
  getOrderByNumber: (orderNumber: string) => Promise<Order|null>
  sendMessage: (queueName: string, input: string, messageGroupId: string) => Promise<void>
}
