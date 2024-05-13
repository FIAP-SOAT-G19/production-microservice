import { OrderRepository } from '@/infra/repositories/order.repository'
import { CreateOrderUseCase } from '@/domain/usecases'
import { UUIDGeneratorAdapter } from '@/adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '@/adapters/tools/validation/joi-validator.adapter'
import { CreateOrderGateway } from '@/adapters/gateways'
import { AWSSQSService } from '@/infra/aws-sqs/aws-sqs-service'

export const makeCreateOrderUseCase = (): CreateOrderUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  const orderRepository = new OrderRepository()
  const queueService = new AWSSQSService()
  
  const gateway = new CreateOrderGateway(orderRepository, queueService)

  return new CreateOrderUseCase(schemaValidator, uuidGenerator, gateway)
}
