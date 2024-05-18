import { UpdateOrderStatusUseCase } from './update-order-status.usecase'
import { MissingParamError, InvalidParamError, ServerError } from '@/presentation/errors'
import { Order, OrderStatus } from '../models/order'
import { IUpdateOrderStatusGateway, IUpdateOrderStatusUseCase } from '@/interfaces'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const gateway = mock<IUpdateOrderStatusGateway>()

describe('UpdateOrderStatusUseCase', () => {
  let sut: IUpdateOrderStatusUseCase
  let order: Order
  let input: any

  beforeEach(() => {
    sut = new UpdateOrderStatusUseCase(gateway)
    order = {
      orderNumber: 'anyOrderNumber',
      status: OrderStatus.IN_PREPARATION,
      totalValue: 8000,
      createdAt: new Date().toISOString(),
      updatedAt: null,
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
        name: 'anyClientName',
        email: "anyEmail@email.com",
        cpf: "anyCPF",
      }
    }
    input = {
      orderNumber: 'anyOrderNumber',
      status: OrderStatus.IN_PREPARATION
    }
    gateway.getByOrderNumber.mockResolvedValue(order)
    gateway.updateStatus.mockResolvedValue(order)
    gateway.sendMessage.mockResolvedValue()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throw if orderNumber is not provided', async() => {
    const output = sut.execute({ ...input, orderNumber: undefined })

    await expect(output).rejects.toThrow(new MissingParamError('orderNumber'))
  })

  test('should throw if status is not provided', async() => {
    const output = sut.execute({ ...input, status: undefined })

    await expect(output).rejects.toThrow(new MissingParamError('status'))
  })

  test('should throw if status is invalid', async() => {
    const output = sut.execute({ ...input, status: 'invalid-status' })

    await expect(output).rejects.toThrow(new InvalidParamError('status'))
  })

  test('should throw if orderNumber is invalid', async () => {
    gateway.getByOrderNumber.mockResolvedValueOnce(null)

    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new InvalidParamError('orderNumber'))
  })

  test('should call gateway.updateStatus once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.updateStatus).toHaveBeenCalledTimes(1)
    expect(gateway.updateStatus).toHaveBeenCalledWith('anyOrderNumber', OrderStatus.IN_PREPARATION)
  })

  test('should throw error if gateway.updateStatus doesnt return anything', async () => {
    gateway.updateStatus.mockResolvedValueOnce(undefined as any)
    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new ServerError())
  })

  test('should call gateway.sendMessage once and with correct values', async () => {
    await sut.execute(input)

    expect(gateway.sendMessage).toHaveBeenCalledTimes(1)
    expect(gateway.sendMessage).toHaveBeenCalledWith(
      process.env.SEND_MESSAGE_QUEUE,
      JSON.stringify(input),
      input.orderNumber
    )
  })

})

