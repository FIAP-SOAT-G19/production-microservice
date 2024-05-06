import { IGetOrderByNumberGateway, IGetOrderByNumberUseCase } from '@/interfaces'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Order } from '../models/order'

export class GetOrderByNumberUseCase implements IGetOrderByNumberUseCase {
  constructor(private readonly gateway: IGetOrderByNumberGateway) {}

  async execute (orderNumber: string): Promise<Order> {
    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }

    const order = await this.gateway.getOrderByNumber(orderNumber)
    if (!order) {
      throw new InvalidParamError('Order not found')
    }
    return order
  }
}
