import { SchemaValidationError, ServerError } from '@/presentation/errors'
import { ICreateOrderUseCase, ISchemaValidator, IUUIDGenerator, ICreateOrderGateway } from '@/interfaces'
import { Order, OrderStatus } from '../models/order'

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly uuidGenerator: IUUIDGenerator,
    private readonly gateway: ICreateOrderGateway
  ) {}

  async execute (input: ICreateOrderUseCase.Input): Promise<void> {
    await this.validate(input)

    const createdOrder = await this.saveOrder(input)

    if (!createdOrder) {
      throw new ServerError()
    }
    
    await this.sendMessage(createdOrder)
  }

  private async validate (input: ICreateOrderUseCase.Input): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: 'orderSchema',
      data: input
    })

    if (validation.error) {
      throw new SchemaValidationError(validation.error)
    }
  }

  private async saveOrder (input: ICreateOrderUseCase.Input): Promise<Order> {
    const { orderNumber, clientId, clientDocument, totalValue, paidAt, client, products } = input

    const orderId = this.uuidGenerator.generate()

    const createdOrder = await this.gateway.saveOrder({
      id: orderId,
      orderNumber,
      clientId: clientId ?? null,
      clientDocument: clientDocument ?? null,
      status: OrderStatus.RECEIVED,
      totalValue,
      paidAt,
      client,
      products,
      createdAt: new Date(),
      updatedAt: null
    })

    return createdOrder
  }

  private async sendMessage(input: Order): Promise<void> {
    const queueName = process.env.SEND_MESSAGE_QUEUE as string
    const messageBody = JSON.stringify(input)
    const messageId = input.orderNumber

    await this.gateway.sendMessage(queueName, messageBody, messageId)
  }
}
