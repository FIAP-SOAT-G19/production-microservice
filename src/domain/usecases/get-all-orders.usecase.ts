import { IGetAllOrdersUseCase, IGetAllOrdersGateway, IGetAllOrdersPresenter } from '@/interfaces'
import { InvalidParamError } from '../../presentation/errors'
import { OrderStatus } from '../models/order'

export class GetAllOrdersUseCase implements IGetAllOrdersUseCase {
  constructor(
    private readonly gateway: IGetAllOrdersGateway,
    private readonly presenter: IGetAllOrdersPresenter
  ) {}

  async execute (input: IGetAllOrdersUseCase.Input): Promise<IGetAllOrdersUseCase.Output> {
    const queryOptions = this.makeQueryOptions(input)
    const orders = await this.gateway.getAllOrders(queryOptions)
    const ordenatedOrders = this.presenter.createOrdenation(orders)

    return ordenatedOrders
  }

  private makeQueryOptions (input: IGetAllOrdersUseCase.Input): IGetAllOrdersUseCase.Input {
    const { status, paidAtInitialDate, paidAtEndDate, createdAtInitialDate, createdAtEndDate } = input
    const options: IGetAllOrdersUseCase.Input = {}


    if (status) {
      if (!(status in OrderStatus)) {
        throw new InvalidParamError('status')
      }

      options.status = status
    }

    if (paidAtInitialDate) {
      options.paidAtInitialDate = paidAtInitialDate
    }

    if (paidAtEndDate) {
      options.paidAtEndDate = paidAtEndDate
    }

    if (createdAtInitialDate) {
      options.createdAtInitialDate = createdAtInitialDate
    }

    if (createdAtEndDate) {
      options.createdAtEndDate = createdAtEndDate
    }

    return options
  }
}
