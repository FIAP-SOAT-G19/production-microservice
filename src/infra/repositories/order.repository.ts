import { GetAllOrdersInput, GetAllOrdersOutput, IOrderRepository, OrderOutput } from '../../interfaces'
import { DynamoDBClientHelper } from '../dynamodb/dynamodb-helper'
import { Order } from '../../domain/models/order'

export class OrderRepository implements IOrderRepository {
    
  	async save(input: Order): Promise<OrderOutput> {
		const client = new DynamoDBClientHelper()
		const order = await client.save(input)
		return order
  	}

	async getByOrderNumber(orderNumber: string): Promise<OrderOutput> {
		const client = new DynamoDBClientHelper()
		const order = await client.getByOrderNumber(orderNumber)
		return order
	}

	async getAll(input: GetAllOrdersInput): Promise<GetAllOrdersOutput> {
		const client = new DynamoDBClientHelper()
		const orders = await client.getAll(input)
		return orders
	}

	async updateStatus(id: string, status: string): Promise<OrderOutput> {
		const client = new DynamoDBClientHelper()
		const order = await client.updateStatus(id, status)
		return order
	}

	async delete(id: string): Promise<void> {
		const client = new DynamoDBClientHelper()
		const order = await client.delete(id)
		// return order
	}
}
