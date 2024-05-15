export enum OrderStatus {
    RECEIVED = 'received',
    IN_PREPARATION = 'InPreparation',
    PREPARED = 'prepared',
    FINALIZED = 'finalized',  
    CANCELED = 'canceled'
}

export interface Order {
    orderNumber: string
    status: string
    totalValue: number
    createdAt: string
    updatedAt: string | null
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
