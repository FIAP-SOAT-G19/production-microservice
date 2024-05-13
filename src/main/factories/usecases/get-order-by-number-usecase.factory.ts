import { GetOrderByNumberUseCase } from '@/domain/usecases'
import { OrderRepository } from '@/infra/repositories/order.repository'
import { GetOrderByNumberGateway } from '@/adapters/gateways'

export const makeGetOrderByNumberUseCase = (): GetOrderByNumberUseCase => {
  const gateway = new GetOrderByNumberGateway(new OrderRepository())
  return new GetOrderByNumberUseCase(gateway)
}
