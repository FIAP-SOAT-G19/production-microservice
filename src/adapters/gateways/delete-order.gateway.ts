import { IOrderRepository, IDeleteOrderGateway, OrderOutput } from '@/interfaces'

export class DeleteOrderGateway implements IDeleteOrderGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}
  
  async getOrderByNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }

  async deleteOrder (orderNumber: string): Promise<void> {
    await this.orderRepository.delete(orderNumber)
  }
}
