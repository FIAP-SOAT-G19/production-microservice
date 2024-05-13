import { logger } from '@/presentation/helpers/logger.helper'
import { ICreateOrderUseCase, IQueueService } from '@/interfaces'

export class AWSSQSPoller {
  constructor(
    private readonly createOrderUseCase: ICreateOrderUseCase,
    private readonly queueService: IQueueService
  ) {}

  async processMessagesOnQueue(): Promise<void> {
    const queueName = process.env.RECEIVE_MESSAGE_QUEUE

    if (queueName) {
      while (true) {
        try {
          const messages = await this.receiveMessage(queueName)
    
          if (messages?.length) {
            for (const message of messages) {
              await this.createOrder(message)
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

