import { Order } from '@/domain/models/order'

export interface IGetAllOrdersUseCase {
  execute: (input: IGetAllOrdersUseCase.Input) => Promise<IGetAllOrdersUseCase.Output>
}

export namespace IGetAllOrdersUseCase {
  export type Input = {
    status?: string
    createdAtInitialDate?: string
    createdAtEndDate?: string
  }

  export type Output = Order[] | null
}
