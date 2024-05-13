import { CreateOrderGateway } from "@/adapters/gateways";
import { UUIDGeneratorAdapter } from "@/adapters/tools/uuid/uuid-generator";
import { JoiValidatorSchemaAdapter } from "@/adapters/tools/validation/joi-validator.adapter";
import { CreateOrderUseCase } from "@/domain/usecases";
import { AWSSQSPoller } from "@/infra/aws-sqs/aws-sqs-poller";
import { AWSSQSService } from "@/infra/aws-sqs/aws-sqs-service";
import { OrderRepository } from "@/infra/repositories/order.repository";

export const messagePollerFactory = async(): Promise<AWSSQSPoller> => {
    const schemaValidator = new JoiValidatorSchemaAdapter()
    const uuidGenerator = new UUIDGeneratorAdapter()
    const orderRepository = new OrderRepository()
    const queueService = new AWSSQSService()

    const createOrderGateway = new CreateOrderGateway(orderRepository, queueService)
    const createOrderUseCase = new CreateOrderUseCase(schemaValidator, uuidGenerator, createOrderGateway)

    return new AWSSQSPoller(createOrderUseCase, queueService)
}