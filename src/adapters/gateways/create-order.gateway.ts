import { IMessageProducer, IOrderRepository, ICreateOrderGateway } from '../../interfaces'
import { Order } from '../../domain/models/order'

export class CreateOrderGateway implements ICreateOrderGateway {
  constructor(
    private readonly orderRepository: IOrderRepository,
    private readonly messageProducer: IMessageProducer
  ) {}

  async saveOrder (input: Order): Promise<Order> {
    return await this.orderRepository.save(input)
  }

  async sendMessage (input: Order): Promise<void> {
    return await this.messageProducer.execute(input)
  }
}
