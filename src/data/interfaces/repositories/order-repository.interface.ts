import { Order } from '../../../domain/entities/order.types'

export interface IOrderRepository {
    save: (input: Order) => Promise<OrderData>
    getById: (id: string) => Promise<OrderData>
    // getAll: (input: GetAllOrdersInput) => Promise<OrderData[] | null>
    updateStatus: (id: string, status: string) => Promise<OrderData>
    delete: (orderNumber: string) => Promise<void>
}

export type OrderData = Order | null

export type GetAllOrdersInput = {
    clientId?: string
    clientDocument?: string
    status?: string
    paidAtInitialDate?: string
    paidAtEndDate?: string
    createdAtInitialDate?: string
    createdAtEndDate?: string
}