import faker from 'faker'

import { AddTodo, DeleteTodo, UpdateTodo, LoadTodos } from '@/domain/usecases'

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
  todo: DeleteTodo.Params

  async delete(todo: DeleteTodo.Params): Promise<void> {
    this.todo = todo
  }
}

export class UpdateTodoSpy implements UpdateTodo {
  todo: UpdateTodo.Params
  result = {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  async update(todo: UpdateTodo.Params): Promise<UpdateTodo.Result> {
    this.todo = todo
    return this.result
  }
}

export class LoadTodosSpy implements LoadTodos {
  result = [
    {
      id: faker.random.uuid(),
      title: faker.random.words(3),
      completed: false
    }
  ]

  async loadAll(): Promise<LoadTodos.Result> {
    return this.result
  }
}
