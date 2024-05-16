import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, ScanCommand, UpdateCommand, DeleteCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { Order } from '@/domain/models/order';
import { OrderOutput, GetAllOrdersInput, GetAllOrdersOutput } from '@/interfaces';

export class DynamoDBClientHelper {
    private readonly docClient: DynamoDBDocumentClient
    tableName: string

    constructor() {
        this.docClient = this.createDocClient()
        this.tableName = process.env.TABLE_NAME as string
    }

    private createDocClient(): DynamoDBDocumentClient {
        const client = new DynamoDBClient({ region: process.env.AWS_REGION })
        const docClient = DynamoDBDocumentClient.from(client);
        return docClient
    }

    async save(orderDTO: Order): Promise<void> {
        const command = new PutCommand({
            TableName: this.tableName,
            Item: orderDTO
        });
        
        await this.docClient.send(command)
    }

    async getByOrderNumber(orderNumber: string): Promise<any> {
        const command = new GetCommand({
            TableName: this.tableName,
            Key: {orderNumber},
        })

        const response = await this.docClient.send(command)
        return response.Item
    }

    async getAll(params: GetAllOrdersInput): Promise<any> {
        let commandParams: any = {}

        if (params.status) {
            commandParams = {
                FilterExpression: '#order_status = :status',
                ExpressionAttributeValues: { ':status': params.status },
                ExpressionAttributeNames: {  '#order_status': 'status' }
            }
        }

        const command = new ScanCommand({
            TableName: this.tableName,
            ConsistentRead: true,
            ...commandParams
        })

        const response = await this.docClient.send(command)
        return response.Items
    }

    async updateStatus(orderNumber: string, status: string): Promise<void> {

        const command = new UpdateCommand({
            TableName: this.tableName,
            Key: { orderNumber },
            UpdateExpression: 'set #order_status = :status',
            ExpressionAttributeValues: {
                ':status': status
            },
            ExpressionAttributeNames: {  '#order_status': 'status' },
            ReturnValues: 'ALL_NEW'

        })

        await this.docClient.send(command)
    }

    async delete(orderNumber: string): Promise<void> {
        const command = new DeleteCommand({
            TableName: this.tableName,
            Key: { orderNumber }
        })

        await this.docClient.send(command)
    }

}