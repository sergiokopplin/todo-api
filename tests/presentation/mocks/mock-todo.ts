import faker from 'faker'

import { AddTodo, DeleteTodo } from '@/domain/usecases'

export class AddTodoSpy implements AddTodo {
  params: AddTodo.Params
  result = {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  async add(params: AddTodo.Params): Promise<AddTodo.Result> {
    this.params = params
    return this.result
  }
}

export class DeleteTodoSpy implements DeleteTodo {
  params: DeleteTodo.Params

  async delete(params: DeleteTodo.Params): Promise<void> {
    this.params = params
  }
}
