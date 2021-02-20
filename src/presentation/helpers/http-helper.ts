import { HttpResponse } from '@/presentation/protocols'

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})
