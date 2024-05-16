import { 
  SendMessageRequest, 
  SQSClient, 
  SendMessageCommand, 
  ReceiveMessageCommand, 
  ReceiveMessageRequest, 
  DeleteMessageRequest, 
  DeleteMessageCommand 
} from '@aws-sdk/client-sqs'
import { IQueueService } from '@/interfaces'
import { logger } from '@/presentation/helpers/logger.helper'

export class AWSSQSService implements IQueueService {
  private readonly client: SQSClient

  constructor() {
    this.client = this.createClient()
  }

  async sendMessage(queueName: string, message: string, messageGroupId: string, messageDeduplicationId: string): Promise<boolean> {
    const input: SendMessageRequest = {
      QueueUrl: queueName,
      MessageBody: message,
      MessageGroupId: messageGroupId,
      MessageDeduplicationId: messageDeduplicationId
    }

    const command = new SendMessageCommand(input)
    const sendMessage = await this.client.send(command)

    return !!sendMessage
  }

  async receiveMessage(queueName: string): Promise<any> {
    const input: ReceiveMessageRequest = {
      QueueUrl: queueName,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 20,
      AttributeNames: ['All']
    }

    const command = new ReceiveMessageCommand(input)
    const messages = await this.client.send(command)

    if (messages?.Messages) {
      logger.info(`Received message: ${messages.Messages[0].Body}`)
      return messages.Messages
    }

    return null
  }

  async deleteMessage(queueName: string, receiptHandle: string, messageId: string): Promise<void> {
    const input: DeleteMessageRequest = {
      QueueUrl: queueName,
      ReceiptHandle: receiptHandle
    }

    const command = new DeleteMessageCommand(input)
    logger.info(`Deleting message: ${messageId}`)

    await this.client.send(command)
  }

  private createClient(): SQSClient {
    return new SQSClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_KEY!
      }
    })
  }
}
