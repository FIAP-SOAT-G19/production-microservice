import { MissingParamError, InvalidParamError } from '@/presentation/errors'
import { DeleteOrderUseCase } from './delete-order.usecase'
import { Order, OrderStatus } from '../models/order'
import { IDeleteOrderGateway, IDeleteOrderUseCase } from '@/interfaces'
import { mock } from 'jest-mock-extended'

const gateway = mock<IDeleteOrderGateway>()

describe('DeleteOrderUseCase', () => {
  let sut: IDeleteOrderUseCase
  let input: string
  let orderOutput: Order

  beforeEach(() => {
    sut = new DeleteOrderUseCase(gateway)
    input = 'anyOrderNumber'
    orderOutput = {
      orderNumber: "anyOrderNumber",
      totalValue: 8000,
      status: OrderStatus.CANCELED,
      products: [{
        id: 'anyProductId',
        name: 'AnyProductName',
        category: 'anyProductCategory',
        price: 2500,
        description: 'anyProductDescription',
        image: 'anyProductImageUrl',
        amount: 1
      }, {
        id: 'anyAnotherProductId',
        name: 'AnyAnotherProductName',
        category: 'anyAnotherProductCategory',
        price: 1000,
        description: 'anyAnotherProductDescription',
        image: 'anyAnotherProductImageUrl',
        amount: 1
      }],
      client: {
        name: "anyClientName",
        email: "anyEmail@email.com",
        cpf: "anyCPF",
      },
      createdAt: "2024-05-15T10:00:00.000Z",
      updatedAt: null
    }

    gateway.getOrderByNumber.mockResolvedValue(orderOutput)
  })

  test('should call gateway.getOrderByNumber once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(gateway.getOrderByNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getOrderByNumber).toHaveBeenCalledWith(input)
  })

  test('should throw if orderNumber is not provided', async () => {
    const output = sut.execute(null as any)

    await expect(output).rejects.toThrow(new MissingParamError('orderNumber'))
  })

  test('should throw an exception if order has status that is not canceled', async () => {
    const invalidOrder = {
      ...orderOutput,
      status: OrderStatus.RECEIVED
    }
    gateway.getOrderByNumber.mockResolvedValueOnce(invalidOrder)

    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new InvalidParamError('only orders with canceled status can be deleted'))
  })

  test('should throw an exception if order is not found', async () => {
    gateway.getOrderByNumber.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new InvalidParamError('orderNumber'))
  })

  test('should call gateway.deleteOrder once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(gateway.deleteOrder).toHaveBeenCalledTimes(1)
    expect(gateway.deleteOrder).toHaveBeenCalledWith('anyOrderNumber')
  })
})
