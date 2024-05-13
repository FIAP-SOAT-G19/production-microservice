import { OrderRepository } from '../../../infra/repositories/order.repository'
import { CreateOrderUseCase } from '../../../domain/usecases'
import { UUIDGeneratorAdapter } from '../../../adapters/tools/uuid/uuid-generator'
import { JoiValidatorSchemaAdapter } from '../../../adapters/tools/validation/joi-validator.adapter'
import { CreateOrderGateway } from '../../../adapters/gateways'
import { AWSSQSService } from '@/infra/aws-sqs/aws-sqs-service'

export const makeCreateOrderUseCase = (): CreateOrderUseCase => {
  const schemaValidator = new JoiValidatorSchemaAdapter()
  const uuidGenerator = new UUIDGeneratorAdapter()
  
  const gateway = new CreateOrderGateway(
    new OrderRepository(),
    new AWSSQSService()
  )

  return new CreateOrderUseCase(
    schemaValidator,
    uuidGenerator,
    gateway
  )
}
