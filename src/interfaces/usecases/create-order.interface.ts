export interface ICreateOrderUseCase {
  execute: (input: any) => Promise<void>
}
