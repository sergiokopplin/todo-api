import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequestError, serverError } from '@/presentation/helpers'

export class AddTodoController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTodoController {
  export interface Request {
    title: string
  }
}
