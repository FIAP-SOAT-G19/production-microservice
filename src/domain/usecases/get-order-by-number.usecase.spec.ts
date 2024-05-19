import { NotFoundError, MissingParamError } from '@/presentation/errors'
import { GetOrderByNumberUseCase } from './get-order-by-number.usecase'
import { mock } from 'jest-mock-extended'
import { Order } from '../models/order'
import { IGetOrderByNumberGateway, IGetOrderByNumberUseCase } from '@/interfaces'

const gateway = mock<IGetOrderByNumberGateway>()

describe('GetOrderByNumberUseCase', () => {
  let sut: IGetOrderByNumberUseCase
  let order: Order

  beforeEach(() => {
    sut = new GetOrderByNumberUseCase(gateway)
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
    gateway.getOrderByNumber.mockResolvedValue(order)
  })

  test('should throw if orderNumber does not provided', async () => {
    const output = sut.execute(null as any)

    await expect(output).rejects.toThrow(new MissingParamError('orderNumber'))
  })

  test('should call gateway.getOrderByNumbergetByNumber once and with correct orderNumber', async () => {
    await sut.execute('anyOrderNumber')

    expect(gateway.getOrderByNumber).toHaveBeenCalledTimes(1)
    expect(gateway.getOrderByNumber).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should return a order', async () => {
    const output = await sut.execute('anyOrderNumber')

    expect(output).toEqual(order)
  })

  test('should throw if orderNumber is invalid', async () => {
    gateway.getOrderByNumber.mockResolvedValueOnce(null)

    const output = sut.execute('anyOrderNumber')

    await expect(output).rejects.toThrow(new NotFoundError('order'))
  })
})
