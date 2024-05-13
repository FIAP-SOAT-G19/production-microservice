import { GetOrderByNumberController } from '@/presentation/controllers'
import { makeGetOrderByNumberUseCase } from '../usecases/get-order-by-number-usecase.factory'

export const makeGetOrderByNumberController = (): GetOrderByNumberController => {
  return new GetOrderByNumberController(makeGetOrderByNumberUseCase())
}
