import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { Order } from '../../domain/entities/order.types';
import { SaveOrderOutput, GetOrderOutput, FindAllOrdersOutput, UpdateOrderOutput, DeleteOrderOutput } from './dynamodb-types';

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

    async save(orderDTO: Order): Promise<Order | null> {
    
        const command = new PutCommand({
            TableName: process.env.TABLE_NAME as string,
            Item: orderDTO
        });
        
        const { Attributes: response } = await this.docClient.send(command) as SaveOrderOutput<Order>
        return response || null;
    }

    async getById(id: string): Promise<Order | null> {
        const command = new GetCommand({
            TableName: process.env.TABLE_NAME as string,
            Key: { id }
        })

        const { Item: response } = await this.docClient.send(command) as GetOrderOutput<Order>

        return response || null
    }

    // async getAll(params: string): Promise<Order | null> {
    //     let queryString: string = ''
    //     let queryValues: any = {}

    //     if (params.status) {
    //         queryString = 'status = :status'
    //         queryValues = { ':status': params.status }
    //     } else {
    //         queryString = '(status = :received OR status = :InPreparation OR status = :prepared)'
    //         queryValues = { ':received': 'received', ':InPreparation': 'InPreparation', ':prepared': 'prepared' }
    //     }

    //     const command = new QueryCommand({
    //         TableName: process.env.TABLE_NAME as string,
    //         KeyConditionExpression: queryString,
    //         ExpressionAttributeValues: queryValues,
    //         ConsistentRead: true
    //     })

    //     const { Items: response } = await this.docClient.send(command) as FindAllOutput<Order>
    //     return response || null;
    // }

    async updateStatus(id: string, status: string): Promise<Order | null> {

        const command = new UpdateCommand({
            TableName: process.env.TABLE_NAME as string,
            Key: { id },
            UpdateExpression: 'set status = :status',
            ExpressionAttributeValues: {
                ':status': status
            },
            ReturnValues: 'ALL_NEW'

        })

        const { Attributes: response } = await this.docClient.send(command) as UpdateOrderOutput<Order>
        return response || null

    }

    async delete(id: string): Promise<Order | null> {
        const command = new DeleteCommand({
            TableName: process.env.TABLE_NAME as string,
            Key: { id }
        })

        const { Attributes: response } = await this.docClient.send(command) as DeleteOrderOutput<Order>
        return response || null
    }

}