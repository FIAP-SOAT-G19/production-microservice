import { IController, IUpdateOrderStatusUseCase, HttpRequest, HttpResponse } from '@/interfaces'
import { success } from '../helpers'
import { handleError } from '../errors/handle-error'

export class UpdateOrderStatusController implements IController {
  constructor(private readonly updateOrderStatusUseCase: IUpdateOrderStatusUseCase) {}

  async execute(input: HttpRequest): Promise<HttpResponse> {
    const { orderNumber, status } = input.params
    try {
      await this.updateOrderStatusUseCase.execute({
        orderNumber,
        status
      })
      return success(204, null)
      
    } catch (error: any) {
      return handleError(error)
    }
  }
}
