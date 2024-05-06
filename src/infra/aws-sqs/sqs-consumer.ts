import { ICreateOrderController, IMessageConsumer } from '../../interfaces'
import AWS from 'aws-sdk'

export class SQSMessageConsumer implements IMessageConsumer {

    constructor(private readonly createOrderController: ICreateOrderController) {}

    private createSQS(): AWS.SQS {
        return new AWS.SQS({ apiVersion: "2012-11-05" });
    }

    private config(): void {
        const AWSRegion = process.env.AWS_REGION as string
        AWS.config.update({ region: AWSRegion });
    }
    
    async execute(): Promise<void> {
        
        this.config()

        const sqs = this.createSQS()
        
        const queueURL = process.env.CONSUMER_SQS_URL as string
        
        var params = {
            AttributeNames: ["SentTimestamp"],
            MaxNumberOfMessages: 10,
            MessageAttributeNames: ["All"],
            QueueUrl: queueURL,
            VisibilityTimeout: 20,
            WaitTimeSeconds: 0,
        };
        
        const messages = sqs.receiveMessage(params, function (err, data) {
            
            // if (err) {
            //     console.log("Receive Error", err);
            // } else if (data.Messages) {
            // }
            return data.Messages
        });

        await this.createOrderController.execute(messages)
    }
}
