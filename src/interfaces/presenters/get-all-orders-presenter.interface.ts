import { GetAllOrdersOutput } from '../'

export interface IGetAllOrdersPresenter {
  createOrdenation: (input: GetAllOrdersOutput) => GetAllOrdersOutput
}
