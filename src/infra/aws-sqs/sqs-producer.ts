import AWS from 'aws-sdk'

import { IMessageProducer } from '../../interfaces'
import { Order } from '../../domain/models/order'

const AWSAccessKey = process.env.AWS_ACCESS_KEY
const AWSSecretKey = process.env.AWS_SECRET_KEY
const AWSRegion = process.env.AWS_REGION
const SQSUrl = process.env.PRODUCER_SQS_URL as string

export class SQSMessageProducer implements IMessageProducer {

    async execute(orderData: Order): Promise<void> {

        AWS.config.update({
            accessKeyId: AWSAccessKey,
            region: AWSRegion
        })

        const sqs = new AWS.SQS({ apiVersion: "2012-11-05" }); //rever data

        const params = {
            MessageAttributes: {
                OrderId: {
                    DataType: 'String',
                    StringValue: orderData.id
                }
            },
            MessageBody: JSON.stringify({ status: orderData.status }),
            MessageDeduplicationId: 'OrderId',
            MessageGroupId: 'Group1',
            QueueUrl: SQSUrl
        }

        sqs.sendMessage(params, (error, data) => {
            if (error) {
                console.log("Error", error);
            } else {
                console.log("Success", data.MessageId);
            }
        })
    }
}