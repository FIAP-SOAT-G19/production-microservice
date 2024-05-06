export interface ReceivedMessage {
    id: string,
    orderId: string //verificar infos pagamento
    status: string
    totalValue: number
    paidAt?: Date
    clientId?: string
    clientDocument?: string
    createdAt?: Date
    updatedAt?: Date
}
