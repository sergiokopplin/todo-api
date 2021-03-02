import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequestError, ok, serverError } from '@/presentation/helpers'
import { AddTodo } from '@/domain/usecases'
import { ServerError } from '../errors'

export class AddTodoController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addTodo: AddTodo
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const result = await this.addTodo.add(request)
      return ok(result)
    } catch (error) {
      return serverError(new ServerError(error))
    }
  }
}

export namespace AddTodoController {
  export interface Request {
    title: string
  }
}
