import { HttpResponse }  from './controllers.interface'

export interface ICreateOrderController {
    execute: (input: any) => Promise<HttpResponse | void>
}