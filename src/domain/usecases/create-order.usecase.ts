import { SchemaValidationError, ServerError, InvalidParamError } from '@/presentation/errors'
import { ICreateOrderUseCase, ISchemaValidator, ICreateOrderGateway } from '@/interfaces'
import { Order, OrderStatus } from '../models/order'

export class CreateOrderUseCase implements ICreateOrderUseCase {
  constructor(
    private readonly schemaValidator: ISchemaValidator,
    private readonly gateway: ICreateOrderGateway
  ) {}

  async execute(input: any): Promise<void> {
    
    const orderToSave = this.buildOrder(input)
    await this.validate(orderToSave)
    await this.getOrderByNumber(orderToSave.orderNumber)

    const createdOrder = await this.saveOrder(orderToSave)
    if (!createdOrder) throw new ServerError()
      
    const messageSent = await this.sendMessage(createdOrder)
    if (!messageSent) throw new ServerError()
  }

  private buildOrder(input: any): Order {

    const { orderNumber, totalValue, client, products } = input
    const orderToSave = {
      orderNumber,
      totalValue,
      status: OrderStatus.RECEIVED,
      client: {
        name: client?.name,
        email: client?.email,
        cpf: client?.cpf
      },
      products,
      createdAt: new Date().toISOString(),
      updatedAt: null
    }
    return orderToSave
  }

  private async validate (input: Order): Promise<void> {
    const validation = this.schemaValidator.validate({
      schema: 'orderSchema',
      data: input
    })

    if (validation.error) {
      throw new SchemaValidationError(validation.error)
    }
  }

  private async getOrderByNumber(orderNumber: string): Promise<void> {
    const orderAlreadyExists = await this.gateway.getOrderByNumber(orderNumber)
    if (orderAlreadyExists) throw new InvalidParamError('Order already exists')
  }

  private async saveOrder(input: Order): Promise<Order> {
    const createdOrder = await this.gateway.saveOrder(input)
    return createdOrder
  }

  private async sendMessage(input: Order): Promise<boolean> {
    const { orderNumber, status } = input

    const queueName = process.env.SEND_MESSAGE_QUEUE as string
    const messageBody = JSON.stringify({ orderNumber, status })

    return await this.gateway.sendMessage(queueName, messageBody, orderNumber)
  }
}

