import { IController, IDeleteOrderUseCase, HttpRequest, HttpResponse } from '@/interfaces'
import { success } from '../helpers'
import { handleError } from '../errors/handle-error'

export class DeleteOrderController implements IController {
  constructor(private readonly deleteOrderUseCase: IDeleteOrderUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      await this.deleteOrderUseCase.execute(input.params.orderNumber)
      return success(204, null)
      
    } catch (error: any) {
      return handleError(error)
    }
  }
}
