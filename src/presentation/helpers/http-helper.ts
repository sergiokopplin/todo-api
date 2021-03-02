import { HttpResponse } from '@/presentation/protocols'
import { UnauthorizedError } from '@/presentation/errors'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})

export const forbiddenError = (error: Error): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const badRequestError = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})

export const noContent = (): HttpResponse => ({
  statusCode: 204
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})
