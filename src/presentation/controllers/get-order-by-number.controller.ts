import { IController, IGetOrderByNumberUseCase, HttpRequest, HttpResponse } from '@/interfaces'
import { success } from '../helpers'
import { handleError } from '../errors/handle-error'

export class GetOrderByNumberController implements IController {
  constructor(private readonly getOrderByNumberUseCase: IGetOrderByNumberUseCase) {}

  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getOrderByNumberUseCase.execute(input.params.orderNumber)
      return success(200, output)
      
    } catch (error: any) {
      return handleError(error)
    }
  }
}
