import { IOrderRepository, GetAllOrdersInput, GetAllOrdersOutput, IGetAllOrdersGateway } from '@/interfaces'

export class GetAllOrdersGateway implements IGetAllOrdersGateway {
  constructor(private readonly orderRepository: IOrderRepository) {}

  async getAllOrders (input: GetAllOrdersInput): Promise<GetAllOrdersOutput> {
    return await this.orderRepository.getAll(input)
  }
}
