import { Order } from '../../domain/models/order'

export interface IOrderRepository {
    save: (input: Order) => Promise<Order>
    getByOrderNumber: (orderNumber: string) => Promise<OrderOutput>
    getAll: (input: GetAllOrdersInput) => Promise<GetAllOrdersOutput>
    updateStatus: (id: string, status: string) => Promise<OrderOutput>
    delete: (orderNumber: string) => Promise<void>
}

export type OrderOutput = Order | null

export type GetAllOrdersInput = {
    clientId?: string
    clientDocument?: string
    status?: string
    paidAtInitialDate?: string
    paidAtEndDate?: string
    createdAtInitialDate?: string
    createdAtEndDate?: string
}

export type GetAllOrdersOutput = Order[] | null