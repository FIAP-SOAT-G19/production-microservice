import { Order } from '@/domain/models/order'

export interface ICreateOrderGateway {
  saveOrder: (input: Order) => Promise<Order>
  sendMessage: (queueName: string, input: string, messageGroupId: string) => Promise<void>
}
