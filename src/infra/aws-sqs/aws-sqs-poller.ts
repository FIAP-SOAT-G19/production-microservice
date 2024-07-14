import { logger } from '@/presentation/helpers/logger.helper'
import { ICreateOrderUseCase, IQueueService, IQueuePoller } from '@/interfaces'

export class AWSSQSPoller implements IQueuePoller {
  constructor(
    private readonly createOrderUseCase: ICreateOrderUseCase,
    private readonly queueService: IQueueService
  ) {}

  async processMessagesOnQueue(): Promise<void> {
    const queueName = process.env.APPROVED_PAYMENT_QUEUE
    
    if (queueName) {
      console.log(queueName)
      while (true) {
        try {
          const messages = await this.receiveMessage(queueName)
    
          if (messages?.length) {
            for (const message of messages) {
              const messageBody = JSON.parse(message.Body)
              await this.createOrder(messageBody)
              await this.deleteMessage(queueName, message.ReceiptHandle, message.MessageId)
            }
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
    
        } catch (error: any) {
          logger.error(`Error processing queue message, ${error}`)
        }
      }
    }
  }

  private async receiveMessage(queueName: string): Promise<any> {
    const messages = await this.queueService.receiveMessage(queueName)
    return messages
  }

  private async createOrder(message: any): Promise<void> {
    await this.createOrderUseCase.execute(message)
  }

  private async deleteMessage(queueName: string, receiptHandle: string, messageId: string): Promise<void> {
    await this.queueService.deleteMessage(queueName, receiptHandle, messageId)
  }
}

