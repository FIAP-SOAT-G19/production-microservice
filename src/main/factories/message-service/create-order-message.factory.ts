import { SQSMessageConsumer } from '../../../infra/aws-sqs/sqs-consumer'
import { makeCreateOrderController } from '../controllers/create-order-controller.factory'

export const makeCreateOrderMessage = (): SQSMessageConsumer => {
    return new SQSMessageConsumer(makeCreateOrderController())
}
