import { GetAllOrdersController } from '../../../presentation/controllers'
import { makeGetAllOrdersUseCase } from '../usecases/get-all-orders-usecase.factory'

export const makeGetAllOrdersController = (): GetAllOrdersController => {
  return new GetAllOrdersController(makeGetAllOrdersUseCase())
}
