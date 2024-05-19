import { IOrderRepository, ICreateOrderGateway, IQueueService } from '@/interfaces'
import { Order } from '@/domain/models/order'

export class CreateOrderGateway implements ICreateOrderGateway {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly queueService: IQueueService
  ) {}

  async saveOrder (input: Order): Promise<Order> {
    return await this.orderRepository.save(input)
  }

  async getOrderByNumber (orderNumber: string): Promise<Order|null> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }

  async sendMessage (queueName: string, input: string, messageId: string): Promise<boolean> {
    return await this.queueService.sendMessage(queueName, input, messageId, messageId)
  }

}
