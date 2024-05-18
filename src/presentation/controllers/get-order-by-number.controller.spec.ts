import { IGetOrderByNumberUseCase, HttpRequest } from '@/interfaces'
import { Order } from '@/domain/models/order'
import { InvalidParamError, NotFoundError } from '@/presentation/errors'
import { badRequest, success, serverError, notFound } from '@/presentation/helpers/http.helper'
import { GetOrderByNumberController } from './get-order-by-number.controller'
import { mock } from 'jest-mock-extended'

const getOrderByNumberUseCase = mock<IGetOrderByNumberUseCase>()
const orderOutput: Order = {
  orderNumber: 'anyOrderNumber',
  status: 'finalized',
  totalValue: 4500,
  createdAt: '2023-10-12 16:55:27',
  updatedAt: null,
  client: {
    name: 'anyClientName',
    email: 'anyClientEmail',
    cpf: 'anyClientCpf'
  },
  products: [{
    id: 'anyProductId',
    name: 'anyProductName',
    category: 'anyCategoryProduct',
    price: 1700,
    description: 'anyDescriptionProduct',
    image: 'anyImageProduct',
    amount: 3
  }]
}

describe('GetOrderByNumberController', () => {
  let sut: GetOrderByNumberController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetOrderByNumberController(getOrderByNumberUseCase)
    input = {
      params: {
        orderNumber: 'anyOrderNumber'
      }
    }
    getOrderByNumberUseCase.execute.mockResolvedValue(orderOutput)
  })

  test('should call GetOrderByNumberUseCase once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(getOrderByNumberUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getOrderByNumberUseCase.execute).toHaveBeenCalledWith('anyOrderNumber')
  })

  test('should return 200 and correct order', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(200, orderOutput))
  })

  test('should return a correct error if GetOrderByNumberUseCase throws an exception', async () => {
    const error = new Error('Any ERROR')

    getOrderByNumberUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })

  test('should return a correct error if GetOrderByNumberUseCase throws an exception', async () => {
    const error = new NotFoundError('order')

    getOrderByNumberUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(notFound(error))
  })

  test('should return a correct error if GetOrderByNumberUseCase throws an exception', async () => {
    const error = new InvalidParamError('Any ERROR')

    getOrderByNumberUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
