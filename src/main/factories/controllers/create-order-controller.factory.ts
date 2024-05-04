import { CreateOrderController } from '../../../presentation/controllers'
import { makeCreateOrderUseCase } from '../usecases/create-order-usecase.factory'

export const makeCreateOrderController = (): CreateOrderController => {
  return new CreateOrderController(makeCreateOrderUseCase())
}
