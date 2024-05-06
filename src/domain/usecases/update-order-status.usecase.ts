import { IUpdateOrderStatusUseCase, IUpdateOrderStatusGateway } from '@/interfaces'
import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { OrderStatus } from '../models/order'

export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {
  constructor(private readonly gateway: IUpdateOrderStatusGateway) {}
  async execute (input: IUpdateOrderStatusUseCase.Input): Promise<void> {
    const { orderNumber, status } = input
    await this.validate(input)

    await this.gateway.updateStatus(
      orderNumber,
      status
    )
  }

  private async validate (input: IUpdateOrderStatusUseCase.Input): Promise<void> {
    const { orderNumber, status } = input

    if (!orderNumber) {
      throw new MissingParamError('orderNumber')
    }

    if (!status) {
      throw new MissingParamError('status')
    }

    const order = await this.gateway.getByOrderNumber(orderNumber)
    if (!order) {
      throw new InvalidParamError('orderNumber')
    }

    if (!(status in OrderStatus)) {
      throw new InvalidParamError('status')
    }
  }
}
