import { Order } from '@/domain/models/order'

export interface IGetAllOrdersUseCase {
  execute: (input: IGetAllOrdersUseCase.Input) => Promise<IGetAllOrdersUseCase.Output>
}

export namespace IGetAllOrdersUseCase {
  export type Input = {
    // clientId?: string
    // clientDocument?: string
    status?: string
    paidAtInitialDate?: string
    paidAtEndDate?: string
    createdAtInitialDate?: string
    createdAtEndDate?: string
  }

  export type Output = Order[] | null
}
