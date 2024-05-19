import { IController, HttpRequest, HttpResponse } from '@/interfaces'

export class LivenessController implements IController {
  async execute(input: HttpRequest): Promise<HttpResponse> {
    return { statusCode: 200, body: { status: 'OK' } }
  }
}