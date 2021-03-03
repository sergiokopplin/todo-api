import { AddTodo } from '@/domain/usecases'

export class AddTodoSpy implements AddTodo {
  params: AddTodo.Params
  result = true

  async add(params: AddTodo.Params): Promise<AddTodo.Result> {
    this.params = params
    return this.result
  }
}
