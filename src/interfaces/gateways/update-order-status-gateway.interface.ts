import { OrderOutput } from '../'

export interface IUpdateOrderStatusGateway {
  updateStatus: (orderNumber: string, status: string) => Promise<OrderOutput>
  getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
  sendMessage: (queueName: string, input: string, messageGroupId: string) => Promise<void>
}
