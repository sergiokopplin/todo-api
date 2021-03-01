import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequestError, ok } from '@/presentation/helpers'

export class AddTodoController implements Controller {
  constructor(private readonly validation: Validation) {}

  async handle(request: any): Promise<HttpResponse> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequestError(error)
    }

    return ok({})
  }
}

export namespace AddTodoController {
  export interface Request {
    title: string
  }
}
