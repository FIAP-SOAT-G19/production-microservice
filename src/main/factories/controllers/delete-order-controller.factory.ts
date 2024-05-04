import { DeleteOrderController } from '../../../presentation/controllers'
import { makeDeleteOrderUseCase } from '../usecases/delete-order-usecase.factory'

export const makeDeleteOrderController = (): DeleteOrderController => {
  return new DeleteOrderController(makeDeleteOrderUseCase())
}
