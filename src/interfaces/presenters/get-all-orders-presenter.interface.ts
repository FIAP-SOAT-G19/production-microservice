import { GetAllOrdersOutput, IGetAllOrdersUseCase } from '../'

export interface IGetAllOrdersPresenter {
  createOrdenation: (input: GetAllOrdersOutput, filter: IGetAllOrdersUseCase.Input) => GetAllOrdersOutput
}
