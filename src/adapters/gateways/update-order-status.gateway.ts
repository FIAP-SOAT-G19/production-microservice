import { IOrderRepository, OrderOutput, IUpdateOrderStatusGateway, IQueueService } from '@/interfaces'

export class UpdateOrderStatusGateway implements IUpdateOrderStatusGateway {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly queueService: IQueueService
  ) {}

  async updateStatus (orderNumber: string, status: string): Promise<OrderOutput> {
    return await this.orderRepository.updateStatus(orderNumber, status)
  }

  async getByOrderNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }

  async sendMessage (queueName: string, input: string, messageId: string): Promise<void> {
    await this.queueService.sendMessage(queueName, input, messageId, messageId)
  }
}
