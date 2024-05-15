import { Order } from '@/domain/models/order'

export interface ICreateOrderUseCase {
  execute: (input: Order) => Promise<void>
}
