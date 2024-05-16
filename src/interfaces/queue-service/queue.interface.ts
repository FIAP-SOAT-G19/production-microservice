export interface IQueueService {
    sendMessage: (queueName: string, message: string, messageGroupId: string, messageDeduplicationId: string) => Promise<boolean>
    receiveMessage: (queueName: string) => Promise<any>
    deleteMessage: (queueName: string, receiptHandle: string, messageId: string) => Promise<void>
}
