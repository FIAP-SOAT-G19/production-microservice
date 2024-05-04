import { IController, IGetAllOrdersUseCase, HttpRequest, HttpResponse } from '@/interfaces'
import { success } from '../helpers'
import { handleError } from '../errors/handle-error'

export class GetAllOrdersController implements IController {
  constructor(private readonly getAllOrdersUseCase: IGetAllOrdersUseCase) {}
  
  async execute (input: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.getAllOrdersUseCase.execute(input.query)
      return success(200, output)

    } catch (error: any) {
      return handleError(error)
    }
  }
}
