import { GetAllOrdersInput, GetAllOrdersOutput, IOrderRepository, OrderOutput } from '@/interfaces'
import { DynamoDBClientHelper } from '../dynamodb/dynamodb-helper'
import { Order } from '@/domain/models/order'

export class OrderRepository implements IOrderRepository {

	private createClient(): any {
		return new DynamoDBClientHelper
	}
    
  	async save(input: Order): Promise<Order> {
		const client = this.createClient()
		await client.save(input)
		const order = await client.getByOrderNumber(input.orderNumber)
		return order
  	}

	async getByOrderNumber(orderNumber: string): Promise<OrderOutput> {
		const client = this.createClient()
		const order = await client.getByOrderNumber(orderNumber)
		return order
	}

	async getAll(input: GetAllOrdersInput): Promise<GetAllOrdersOutput> {
		const client = this.createClient()
		const orders = await client.getAll(input)
		return orders
	}

	async updateStatus(orderNumber: string, status: string): Promise<OrderOutput> {
		const client = this.createClient()
		await client.updateStatus(orderNumber, status)
		const order = await client.getByOrderNumber(orderNumber)
		return order
	}

	async delete(id: string): Promise<void> {
		const client = this.createClient()
		await client.delete(id)
	}
}
