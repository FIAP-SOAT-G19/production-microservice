import { IGetAllOrdersUseCase, IGetAllOrdersGateway, IGetAllOrdersPresenter } from '@/interfaces'
import { InvalidParamError } from '@/presentation/errors'
import { OrderStatus } from '../models/order'

export class GetAllOrdersUseCase implements IGetAllOrdersUseCase {
  constructor(
    private readonly gateway: IGetAllOrdersGateway,
    private readonly presenter: IGetAllOrdersPresenter
  ) {}

  async execute (input: IGetAllOrdersUseCase.Input): Promise<IGetAllOrdersUseCase.Output> {
    const queryOptions = this.makeQueryOptions(input)
  
    const orders = await this.gateway.getAllOrders(queryOptions)
    const ordenatedOrders = this.presenter.createOrdenation(orders, input)

    return ordenatedOrders
  }

  private makeQueryOptions (input: IGetAllOrdersUseCase.Input): any {
    const { status } = input

    if (status) {
      if (!Object.values(OrderStatus).includes(status as OrderStatus)) {
        throw new InvalidParamError('status')
      }
      return { status }
    }
    return {}
  }
}
