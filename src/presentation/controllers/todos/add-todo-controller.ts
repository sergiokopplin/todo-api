import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import { badRequestError, created, serverError } from '@/presentation/helpers'
import { AddTodo } from '@/domain/usecases'

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
      const isValid = await this.addTodo.add(request)
      return created(isValid)
    } catch (error) {
      return serverError(error)
    }
  }
}

export namespace AddTodoController {
  export interface Request {
    title: string
    dueDate?: Date
    theme?: Date
  }
}
