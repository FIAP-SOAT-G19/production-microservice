import { IController, HttpRequest, HttpResponse } from '@/interfaces'

export class ReadinessController implements IController {
  async execute(input: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, body: { status: 'OK' } }
  }
}