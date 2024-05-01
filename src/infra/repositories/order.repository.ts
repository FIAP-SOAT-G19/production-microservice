import { GetAllOrdersInput, IOrderRepository, OrderData } from '../../data/interfaces/repositories/order-repository.interface'
import { DynamoDBClientHelper } from '../dynamodb/dynamodb-helper'
import { Order } from '../../domain/entities/order.types'

export class OrderRepository implements IOrderRepository {
    
  	async save(input: Order): Promise<OrderData> {
		const client = new DynamoDBClientHelper()
		const order = await client.save(input)
		return order
  	}

	async getById(id: string): Promise<OrderData> {
		const client = new DynamoDBClientHelper()
		const order = await client.getById(id)
		return order
	}

	// async getAll(input: GetAllOrdersInput): Promise<OrderData[] | null > {
	// 	const client = new DynamoDBClientHelper()
	// 	const orders = await client.getAll(input)
	// 	return orders
	// }

	async updateStatus(id: string, status: string): Promise<OrderData> {
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
