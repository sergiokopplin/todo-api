import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { LoadTodo } from '@/domain/usecases'
import { badRequestError, ok, serverError } from '@/presentation/helpers'

export class LoadTodoController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly loadTodo: LoadTodo
  ) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const result = await this.loadTodo.load(request)
      return ok(result)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace LoadTodoController {
  export interface Request {
    id: string
  }
}
