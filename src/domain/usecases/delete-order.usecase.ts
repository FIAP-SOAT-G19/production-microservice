import { IDeleteOrderUseCase, IDeleteOrderGateway } from '../../interfaces'
import { MissingParamError, InvalidParamError } from '../../presentation/errors'
import { OrderStatus } from '../models/order'

export class DeleteOrderUseCase implements IDeleteOrderUseCase {
  constructor(private readonly gateway: IDeleteOrderGateway) {}
  
  async execute (orderNumber: string): Promise<void> {
    await this.validate(orderNumber)
    await this.gateway.deleteOrder(orderNumber)
  }

  private async validate (orderNumber: string): Promise<void> {
    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }

    const order = await this.gateway.getOrderByNumber(orderNumber)
    if (!order) {
      throw new InvalidParamError('orderNumber')
    }

    if (order.status !== OrderStatus.CANCELED) {
      throw new InvalidParamError('only orders with canceled status can be deleted')
    }
  }
}
