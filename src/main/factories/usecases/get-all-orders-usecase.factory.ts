import { GetAllOrdersUseCase } from '@/domain/usecases'
import { OrderRepository } from '@/infra/repositories/order.repository'
import { GetAllOrdersGateway } from '@/adapters/gateways'
import { GetAllOrdersPresenter } from '@/adapters/presenters/get-all-orders.presenter'

export const makeGetAllOrdersUseCase = (): GetAllOrdersUseCase => {
  const gateway = new GetAllOrdersGateway(new OrderRepository())
  const presenter = new GetAllOrdersPresenter()
  
  return new GetAllOrdersUseCase(
    gateway, 
    presenter
  )
}
