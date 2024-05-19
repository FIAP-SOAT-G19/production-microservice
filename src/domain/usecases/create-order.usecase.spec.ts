import { ISchemaValidator, ICreateOrderGateway, ICreateOrderUseCase } from '@/interfaces'
import { InvalidParamError, ServerError } from '@/presentation/errors'
import { CreateOrderUseCase } from './create-order.usecase'
import { Order } from '../models/order'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const schemaValidator = mock<ISchemaValidator>()
const gateway = mock<ICreateOrderGateway>()

describe('CreateOrderUseCase', () => {
  let sut: ICreateOrderUseCase
  let order: Order
  let input: any

  beforeEach(() => {
    sut = new CreateOrderUseCase(schemaValidator, gateway)

    input = {
      orderNumber: "anyOrderNumber",
      totalValue: 8000,
      cardIdentifier: "6fd92a9e-6a55-4c54-869a-3068e125af27",
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
        id: "AnyId",
        identifier: "anyIdentifier",
        name: "anyClientName",
        email: "anyEmail@email.com",
        cpf: "anyCPF",
        createdAt: "1990-01-01T00:00:00.000Z"
      },
      createdAt: "2024-05-15T10:00:00.000Z"
    }

    order = {
      orderNumber: 'anyOrderNumber',
      status: 'received',
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
    
    gateway.getOrderByNumber.mockResolvedValue(null)
    schemaValidator.validate.mockReturnValue({ value: input })
    gateway.saveOrder.mockResolvedValue(order)
    gateway.sendMessage.mockResolvedValue(true)

    jest.clearAllMocks()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should throw if validation fails', async () => {
    const error = { value: {}, error: 'anyError' }
    schemaValidator.validate.mockReturnValueOnce(error)

    const output = sut.execute(input)

    await expect(output).rejects.toThrow()
  })

  test('should call schemaValidator once and with correct values', async () => {
    await sut.execute(input)

    expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
    expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'orderSchema', data: order })
  })

  test('should call gateway.getOrderByNumber once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(gateway.getOrderByNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getOrderByNumber).toHaveBeenCalledWith(input.orderNumber)
  })

  test('should throw error if gateway.getOrderByNumber returns something', async () => {
    gateway.getOrderByNumber.mockResolvedValueOnce(order)
    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new InvalidParamError('Order already exists'))
  })

  test('should call gateway.saveOrder once and with correct data', async () => {
    await sut.execute(input)

    expect(gateway.saveOrder).toHaveBeenCalledTimes(1)
    expect(gateway.saveOrder).toHaveBeenCalledWith(order)
  })

  test('should throw error if gateway.saveOrder returns nothing', async () => {
    gateway.saveOrder.mockResolvedValueOnce(null as any)
    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new ServerError())
  })

  test('should call gateway.sendMessage once and with correct data', async () => {
    const { orderNumber, status } = order
    await sut.execute(input)

    expect(gateway.sendMessage).toHaveBeenCalledTimes(1)
    expect(gateway.sendMessage).toHaveBeenCalledWith(
      process.env.SEND_MESSAGE_QUEUE,
      JSON.stringify({ orderNumber, status }),
      orderNumber
    )
  })

  test('should throw error if gateway.sendMessage returns false', async () => {
    gateway.sendMessage.mockResolvedValueOnce(false)
    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new ServerError())
  })

})
