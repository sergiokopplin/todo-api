import { HttpResponse } from '@/presentation/protocols'

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
