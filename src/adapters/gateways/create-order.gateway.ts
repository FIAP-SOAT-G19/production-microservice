import { IOrderRepository, ICreateOrderGateway, IQueueService } from '../../interfaces'
import { Order } from '../../domain/models/order'

export class CreateOrderGateway implements ICreateOrderGateway {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly queueService: IQueueService
  ) {}

  async saveOrder (input: Order): Promise<Order> {
    return await this.orderRepository.save(input)
  }

  async sendMessage (queueName: string, input: string, messageId: string): Promise<void> {
    await this.queueService.sendMessage(queueName, input, messageId, messageId)
  }
}
