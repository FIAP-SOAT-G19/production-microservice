import { ISchemaValidator, ICreateOrderGateway } from '@/interfaces'
import { InvalidParamError } from '@/presentation/errors'
import { CreateOrderUseCase } from './create-order.usecase'
import { Order } from '../models/order'
import { mock } from 'jest-mock-extended'
import MockDate from 'mockdate'

const schemaValidator = mock<ISchemaValidator>()
const gateway = mock<ICreateOrderGateway>()

// jest.mock('@/infra/shared/helpers/string.helper', () => {
//   const originalMethod = jest.requireActual('@/infra/shared/helpers/string.helper')
//   return {
//     ...originalMethod,
//     ramdonStringGenerator: jest.fn().mockReturnValue('anyOrderNumber')
//   }
// })

const input = {
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

const order: Order = {
  orderNumber: 'anyOrderNumber',
  status: 'received',
  totalValue: 10000,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
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

describe('CreateOrderUseCase', () => {
  let sut: CreateOrderUseCase

  beforeEach(() => {
    sut = new CreateOrderUseCase(schemaValidator, gateway)
    gateway.getOrderByNumber.mockResolvedValue(null)
    schemaValidator.validate.mockReturnValue({ value: input })
    gateway.saveOrder.mockResolvedValue(order)
    gateway.sendMessage.mockResolvedValue()

    jest.clearAllMocks()
  })

  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call gateway.getOrderByNumber once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(gateway.getOrderByNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getOrderByNumber).toHaveBeenCalledWith(input.orderNumber)
  })

  // test('should call gateway.getOrderByNumber once and with correct clientId', async () => {
  //   await sut.execute(input)

  //   expect(gateway.getOrderByNumber).toHaveBeenCalledTimes(1)
  //   expect(gateway.getOrderByNumber).toHaveBeenCalledWith('anyClientId')
  // })

  // test('should call schemaValidator once and with correct values', async () => {
  //   await sut.execute(input)

  //   expect(schemaValidator.validate).toHaveBeenCalledTimes(1)
  //   expect(schemaValidator.validate).toHaveBeenCalledWith({ schema: 'orderSchema', data: input })
  // })

  // test('should throws if validation fails', async () => {
  //   const error = { value: {}, error: 'anyError' }
  //   schemaValidator.validate.mockReturnValueOnce(error)

  //   const output = sut.execute(input)

  //   await expect(output).rejects.toThrow()
  // })

  // test('should throws if gateway.getClientById returns null', async () => {
  //   gateway.getClientById.mockResolvedValueOnce(null)

  //   const output = sut.execute(input)

  //   await expect(output).rejects.toThrowError(new InvalidParamError('clientId'))
  // })

  // test('should throws if gateway.getProductById returns null', async () => {
  //   gateway.getProductById.mockResolvedValueOnce(null)

  //   const output = sut.execute(input)

  //   await expect(output).rejects.toThrowError(new InvalidParamError('productId'))
  // })

  // test('should call UUIDGenerator', async () => {
  //   await sut.execute(input)

  //   expect(uuidGenerator.generate).toHaveBeenCalledTimes(3)
  // })

  // test('should call gateway.saveOrder once and with correct values', async () => {
  //   await sut.execute(input)

  //   expect(gateway.saveOrder).toHaveBeenCalledTimes(1)
  //   expect(gateway.saveOrder).toHaveBeenCalledWith({
  //     id: 'anyUUID',
  //     clientId: 'anyClientId',
  //     orderNumber: 'anyOrderNumber',
  //     clientDocument: null,
  //     status: 'waitingPayment',
  //     totalValue: 5000,
  //     createdAt: new Date()
  //   })
  // })

  // test('should call gateway.saveOrder once and with correct values and without clientId', async () => {
  //   input.clientId = null
  //   input.clientDocument = 'anyClientDocument'

  //   await sut.execute(input)

  //   expect(gateway.saveOrder).toHaveBeenCalledTimes(1)
  //   expect(gateway.saveOrder).toHaveBeenCalledWith({
  //     id: 'anyUUID',
  //     orderNumber: 'anyOrderNumber',
  //     clientId: null,
  //     clientDocument: 'anyClientDocument',
  //     status: 'waitingPayment',
  //     totalValue: 5000,
  //     createdAt: new Date()
  //   })
  // })

  // test('should return a correct orderId and orderNumber', async () => {
  //   const output = await sut.execute(input)

  //   expect(output).toEqual({
  //     orderNumber: 'anyOrderNumber'
  //   })
  // })

  // test('should call calculateTotalValue once and with correct values', async () => {
  //   const spy = jest.spyOn(sut as any, 'calculateTotalValue')

  //   await sut.execute(input)

  //   expect(spy).toHaveBeenCalledTimes(1)
  //   expect(spy).toHaveBeenCalledWith(input.products)
  // })

  // test('should calculate total value correctly', async () => {
  //   const total = sut.calculateTotalValue(input.products)

  //   expect(total).toBe(5000)
  // })

  // test('should call gateway.saveOrderProduct once and with correct values', async () => {
  //   await sut.execute(input)

  //   expect(gateway.saveOrderProduct).toHaveBeenCalledWith({
  //     id: 'anyUUID',
  //     productId: 'anyProductId',
  //     orderId: 'anyUUID',
  //     amount: 2,
  //     productPrice: 2500,
  //     createdAt: new Date()
  //   })
  // })

  // test('should call gateway.createPayment once and with correct values', async () => {
  //   await sut.execute(input)

  //   expect(gateway.createPayment).toHaveBeenCalledTimes(1)
  //   expect(gateway.createPayment).toHaveBeenCalledWith({
  //     id: 'anyUUID',
  //     orderNumber: 'anyOrderNumber',
  //     status: 'waiting',
  //     reason: null,
  //     createdAt: new Date(),
  //     updatedAt: null
  //   })
  // })
})
