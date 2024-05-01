export enum OrderStatus {
    received = 'received',
    InPreparation = 'InPreparation',
    prepared = 'prepared',
    finalized = 'finalized',  
    canceled = 'canceled'
}

export interface Order {
    id: string
    orderNumber: string
    clientDocument: string | null
    clientId: string | null
    status: string
    totalValue: number
    paidAt: Date | null
    createdAt: Date
    updatedAt: Date
    client: Client | null
    products: OrderProduct[]
}

export type Client = {
    name: string
    email: string
    cpf: string
}
  
export type OrderProduct = {
    id: string
    name: string
    category: string
    price: number
    description: string
    image: string
    amount: number
}