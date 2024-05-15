import { IUpdateOrderStatusUseCase, IUpdateOrderStatusGateway } from '@/interfaces'
import { MissingParamError, InvalidParamError, ServerError } from '@/presentation/errors'
import { OrderStatus } from '../models/order'

export class UpdateOrderStatusUseCase implements IUpdateOrderStatusUseCase {
  constructor(private readonly gateway: IUpdateOrderStatusGateway) {}
  async execute (input: IUpdateOrderStatusUseCase.Input): Promise<void> {
    const { orderNumber, status } = input
    await this.validate(input)

    const updatedOrder = await this.gateway.updateStatus(orderNumber, status)

    if (!updatedOrder) throw new ServerError()

    await this.sendMessage({
      orderNumber,
      status: updatedOrder.status
    })
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

    if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
      throw new InvalidParamError('status')
    }
  }

  private async sendMessage(input: IUpdateOrderStatusUseCase.Input): Promise<void> {
    const { orderNumber, status } = input

    const queueName = process.env.SEND_MESSAGE_QUEUE as string
    const messageBody = JSON.stringify({ orderNumber, status })

    await this.gateway.sendMessage(queueName, messageBody, orderNumber)
  }
}
