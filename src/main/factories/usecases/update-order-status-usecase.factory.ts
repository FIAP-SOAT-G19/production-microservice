import { UpdateOrderStatusUseCase } from '@/domain/usecases'
import { OrderRepository } from '@/infra/repositories/order.repository'
import { UpdateOrderStatusGateway } from '@/adapters/gateways'
import { AWSSQSService } from '@/infra/aws-sqs/aws-sqs-service'

export const makeUpdateOrderStatusUseCase = (): UpdateOrderStatusUseCase => {
  const orderRepository = new OrderRepository()
  const queueService = new AWSSQSService()
  const gateway = new UpdateOrderStatusGateway(orderRepository, queueService)
  
  return new UpdateOrderStatusUseCase(gateway)
}
