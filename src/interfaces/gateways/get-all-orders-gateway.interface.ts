import { GetAllOrdersInput, GetAllOrdersOutput } from '../repositories/order-repository.interface'

export interface IGetAllOrdersGateway {
  getAllOrders: (input: GetAllOrdersInput) => Promise<GetAllOrdersOutput>
}
