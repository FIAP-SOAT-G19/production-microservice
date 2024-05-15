import { AWSSQSPoller } from "@/infra/aws-sqs/aws-sqs-poller";
import { AWSSQSService } from "@/infra/aws-sqs/aws-sqs-service";
import { makeCreateOrderUseCase } from "../usecases/create-order-usecase.factory";

export const messagePollerFactory = (): AWSSQSPoller => {
    const queueService = new AWSSQSService()
    return new AWSSQSPoller(makeCreateOrderUseCase(), queueService)
}