import { IOrderRepository, OrderOutput, IGetOrderByNumberGateway } from '../../interfaces'

export class GetOrderByNumberGateway implements IGetOrderByNumberGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getOrderByNumber (orderNumber: string): Promise<OrderOutput> {
    return await this.orderRepository.getByOrderNumber(orderNumber)
  }
}
