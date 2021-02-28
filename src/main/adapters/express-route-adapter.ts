import { Request, Response } from 'express'

import { Controller } from '@/presentation/protocols'

export const expressRouteAdapt = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    const httpResponse = await controller.handle(request.body)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      response.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      response.status(httpResponse.statusCode).json({
        error: httpResponse.body.message
      })
    }
  }
}
