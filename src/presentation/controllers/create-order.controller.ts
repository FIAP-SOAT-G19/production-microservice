import { ICreateOrderController, ICreateOrderUseCase, HttpRequest, HttpResponse } from '@/interfaces'
import { success } from '../helpers'
import { handleError } from '../errors/handle-error'

export class CreateOrderController implements ICreateOrderController {
  constructor(private readonly createOrderUseCase: ICreateOrderUseCase) {}

  async execute (input: any): Promise<void | HttpResponse> {
    try {
      await this.createOrderUseCase.execute(input.body)
      
    } catch (error: any) {
      return handleError(error)
    }
  }
}
