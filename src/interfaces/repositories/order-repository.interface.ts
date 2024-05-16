import { Order } from '@/domain/models/order'

export interface IOrderRepository {
    save: (input: Order) => Promise<Order>
    getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
    getAll: (input: GetAllOrdersInput) => Promise<GetAllOrdersOutput>
    updateStatus: (orderNumber: string, status: string) => Promise<OrderOutput>
    delete: (orderNumber: string) => Promise<void>
}

export type OrderOutput = Order | null

export type GetAllOrdersInput = {
    status?: string
}

export type GetAllOrdersOutput = Order[] | null