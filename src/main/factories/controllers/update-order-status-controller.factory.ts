import { UpdateOrderStatusController } from '@/presentation/controllers'
import { makeUpdateOrderStatusUseCase } from '../usecases/update-order-status-usecase.factory'

export const makeUpdateOrderStatusUseCaseController = (): UpdateOrderStatusController => {
  return new UpdateOrderStatusController(makeUpdateOrderStatusUseCase())
}
