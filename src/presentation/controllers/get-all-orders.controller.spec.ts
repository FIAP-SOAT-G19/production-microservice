import { IGetAllOrdersUseCase, HttpRequest } from '@/interfaces'
import { InvalidParamError } from '@/presentation/errors'
import { badRequest, success, serverError } from '@/presentation/helpers/http.helper'
import { GetAllOrdersController } from './get-all-orders.controller'
import { Order } from '@/domain/models/order'
import { mock } from 'jest-mock-extended'

const getAllOrdersUseCase = mock<IGetAllOrdersUseCase>()
const orderOutput: Order[] = [{
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
}]

describe('GetAllOrdersController', () => {
  let sut: GetAllOrdersController
  let input: HttpRequest

  beforeEach(() => {
    sut = new GetAllOrdersController(getAllOrdersUseCase)
    input = {
      query: {
        status: 'received',
        clientId: 'anyClientId'
      }
    }
    getAllOrdersUseCase.execute.mockResolvedValue(orderOutput)
  })

  test('should call getAllOrdersUseCase once and with correct orderNumber', async () => {
    await sut.execute(input)

    expect(getAllOrdersUseCase.execute).toHaveBeenCalledTimes(1)
    expect(getAllOrdersUseCase.execute).toHaveBeenCalledWith(input.query)
  })

  test('should return 200 and corrects orders', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(success(200, orderOutput))
  })

  test('should return null if getAllOrdersUseCase returns null', async () => {
    getAllOrdersUseCase.execute.mockResolvedValueOnce(null)

    const output = await sut.execute(input)

    expect(output).toEqual(success(200, null))
  })

  test('should return a correct error if getAllOrdersUseCase throws an exception', async () => {
    const error = new Error('Any ERROR')

    getAllOrdersUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(serverError(error))
  })

  test('should return a correct error if getAllOrdersUseCase throws an exception', async () => {
    const error = new InvalidParamError('Any ERROR')

    getAllOrdersUseCase.execute.mockImplementationOnce(() => { throw error })

    const output = await sut.execute(input)

    expect(output).toEqual(badRequest(error))
  })
})
