import { IOrderRepository, OrderOutput, IUpdateOrderStatusGateway } from '../../interfaces'

export class UpdateOrderStatusGateway implements IUpdateOrderStatusGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async updateStatus (id: string, status: string): Promise<OrderOutput> {
    return await this.orderRepository.updateStatus(id, status)
  }

  async getByOrderNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }
}
