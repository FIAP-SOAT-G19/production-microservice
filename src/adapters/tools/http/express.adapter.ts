import { IController, HttpRequest, HttpResponse } from '@/interfaces'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const input: HttpRequest = {
      params: req?.params,
      body: req?.body,
      query: req?.query
    }

    const { statusCode, body }: HttpResponse = await controller.execute(input)

    const output = (statusCode >= 200 && statusCode < 500) ? body : { error: body.message }

    res.status(statusCode).json(output)
  }
}

