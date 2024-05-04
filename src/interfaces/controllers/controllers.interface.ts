export type HttpRequest = {
  params?: any
  body?: any
  query?: any
}

export type HttpResponse = {
  statusCode: number
  body: any
}

export interface IController {
  execute: (input: HttpRequest) => Promise<HttpResponse>
}
