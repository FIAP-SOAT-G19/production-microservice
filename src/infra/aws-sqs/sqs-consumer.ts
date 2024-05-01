import { IQueueConsumer } from '@/data/interfaces/queue-service/queue-consumer.interface'
import AWS from 'aws-sdk'

const AWSAccessKey = process.env.AWS_ACCESS_KEY
const AWSSecretKey = process.env.AWS_SECRET_KEY
const AWSRegion = process.env.AWS_REGION
const SQSUrl = process.env.CONSUMER_SQS_URL as string

interface ReceiveMessageDTO {
    orderId: string,
    status: string
}

class SQSQueueConsumer implements IQueueConsumer {

    async execute(): Promise<void> {
    
        AWS.config.update({ region: AWSRegion });
        
        const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
        
        var queueURL = SQSUrl;
        
        var params = {
            AttributeNames: ["SentTimestamp"],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ["All"],
            QueueUrl: queueURL,
            VisibilityTimeout: 20,
            WaitTimeSeconds: 0,
        };
        
        sqs.receiveMessage(params, function (err, data) {
            
            if (err) {
                console.log("Receive Error", err);
            } else if (data.Messages) {
                const deleteParams = {
                    QueueUrl: queueURL,
                    ReceiptHandle: data.Messages[0].ReceiptHandle as string,
                };

                sqs.deleteMessage(deleteParams, function (err, data) {
                    if (err) {
                        console.log("Delete Error", err);
                    } else {
                        console.log("Message Deleted", data);
                    }
                });
            }
        });
    }
}
