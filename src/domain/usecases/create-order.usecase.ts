import { SchemaValidationError, ServerError } from '@/presentation/errors'
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

    const orderAlreadyExists = await this.getOrderByNumber(orderToSave.orderNumber)

    if (!orderAlreadyExists) {
      try {
        await this.saveOrder(orderToSave).then(async (createdOrder) => {
          await this.sendMessageToUpdateOrder(createdOrder)
        }).catch(() => {
          throw new ServerError()
        })
      } catch {
        await this.sendMessagesToCancelOrder(orderToSave.orderNumber)
        throw new ServerError()
      } 
    }
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

  private async getOrderByNumber(orderNumber: string): Promise<Order|null> {
    const existentOrder = await this.gateway.getOrderByNumber(orderNumber)
    return existentOrder || null
  }

  private async saveOrder(input: Order): Promise<Order> {
    const createdOrder = await this.gateway.saveOrder(input)
    return createdOrder
  }

  private async sendMessageToUpdateOrder(input: Order): Promise<boolean> {
    const { orderNumber, status } = input

    const queueName = process.env.UPDATE_ORDER_QUEUE as string
    const messageBody = JSON.stringify({ orderNumber, status })

    return await this.gateway.sendMessage(queueName, messageBody, orderNumber)
  }

  private async sendMessagesToCancelOrder(orderNumber: string): Promise<void> {
    const orderQueue = process.env.UPDATE_ORDER_QUEUE as string
    const paymentQueue = process.env.CANCEL_ORDER_QUEUE as string
    const messageBody = JSON.stringify({ orderNumber, status: OrderStatus.CANCELED })

    await this.gateway.sendMessage(orderQueue, messageBody, orderNumber)
    .then(async () => {
      await this.gateway.sendMessage(paymentQueue, messageBody, orderNumber)
    })
  }
}

