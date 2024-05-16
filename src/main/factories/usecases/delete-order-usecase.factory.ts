import { DeleteOrderUseCase } from '@/domain/usecases'
import { OrderRepository } from '@/infra/repositories/order.repository'
import { DeleteOrderGateway } from '@/adapters/gateways'

export const makeDeleteOrderUseCase = (): DeleteOrderUseCase => {
  const gateway = new DeleteOrderGateway(new OrderRepository())
  return new DeleteOrderUseCase(gateway)
}
