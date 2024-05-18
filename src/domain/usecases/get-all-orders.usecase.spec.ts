import { IGetAllOrdersUseCase, IGetAllOrdersGateway, IGetAllOrdersPresenter } from '@/interfaces'
import { InvalidParamError } from '@/presentation/errors'
import { GetAllOrdersUseCase } from './get-all-orders.usecase'
import { mock } from 'jest-mock-extended'

const gateway = mock<IGetAllOrdersGateway>()
const presenter = mock<IGetAllOrdersPresenter>()

describe('GetAllOrdersUseCase', () => {
  let sut: IGetAllOrdersUseCase
  let input: IGetAllOrdersUseCase.Input
  let orders: IGetAllOrdersUseCase.Output

  beforeEach(() => {
    sut = new GetAllOrdersUseCase(gateway, presenter)
    input = {}
    orders = [{
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
    }, {
      orderNumber:  'anotherOrderNumber',
      status: 'finalized',
      totalValue: 4500,
      createdAt: new Date().toISOString(),
      updatedAt: null,
      products: [{
        id: 'anotherProductId',
        name: 'anotherProductName',
        category: 'anotherCategoryProduct',
        price: 1700,
        description: 'anotherDescriptionProduct',
        image: 'anotherImageProduct',
        amount: 3
      }],
      client: {
        name: 'anotherClientName',
        email: 'anotherClientEmail',
        cpf: 'anotherClientCpf'
      }
    }]
    gateway.getAllOrders.mockResolvedValue(orders)
    presenter.createOrdenation.mockReturnValue(orders)
  })

  test('should call gateway.getAllOrders once and with correct values if there arent any filters', async () => {
    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({})
  })

  test('should call gateway.getAllOrders once and with correct values if status is passed in query', async () => {
    input = { status: 'received' }

    await sut.execute(input)

    expect(gateway.getAllOrders).toHaveBeenCalledTimes(1)
    expect(gateway.getAllOrders).toHaveBeenCalledWith({ status: 'received' })
  })

  test('should throw if invalid status is provided', async () => {
    input = { status: 'invalidStatus' }

    const output = sut.execute(input)

    await expect(output).rejects.toThrow(new InvalidParamError('status'))
  })

  test('should call presenter.createOrdenation once with all orders returned', async () => {
    await sut.execute(input)

    expect(presenter.createOrdenation).toHaveBeenCalledTimes(1)
    expect(presenter.createOrdenation).toHaveBeenCalledWith(orders, input)
  })

  test('should call presenter.createOrdenation once with all orders returned and filters', async () => {
    input = { status: 'received', createdAtInitialDate: '2024-05-16', createdAtEndDate: '2024-05-18' }

    await sut.execute(input)

    expect(presenter.createOrdenation).toHaveBeenCalledTimes(1)
    expect(presenter.createOrdenation).toHaveBeenCalledWith(orders, input)
  })

  test('should return null if gateway.getAllOrders and presenter.createOrdenation returns null', async () => {
    gateway.getAllOrders.mockResolvedValueOnce(null)
    presenter.createOrdenation.mockReturnValue(null)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should return null if presenter.createOrdenation returns null', async () => {
    presenter.createOrdenation.mockReturnValue(null)

    const output = await sut.execute(input)

    expect(output).toBeNull()
  })

  test('should return all orders', async () => {
    const output = await sut.execute(input)

    expect(output).toEqual(orders)
  })
})
