import { Order } from '../../domain/models/order'

export interface ICreateOrderUseCase {
  execute: (input: ICreateOrderUseCase.Input) => Promise<void>
}

export namespace ICreateOrderUseCase {
  export type Input = Omit<Order, 'id' | 'createdAt' | 'updatedAt'>
}
