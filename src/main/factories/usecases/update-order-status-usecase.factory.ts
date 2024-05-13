import { UpdateOrderStatusUseCase } from '@/domain/usecases'
import { OrderRepository } from '@/infra/repositories/order.repository'
import { UpdateOrderStatusGateway } from '@/adapters/gateways'

export const makeUpdateOrderStatusUseCase = (): UpdateOrderStatusUseCase => {
  const gateway = new UpdateOrderStatusGateway(new OrderRepository())
  return new UpdateOrderStatusUseCase(gateway)
}
