import faker from 'faker'

import { Todo } from '@/domain/models'
import {
  AddTodoRepository,
  DeleteTodoRepository,
  LoadTodosRepository,
  UpdateTodoRepository,
  LoadTodoRepository
} from '@/data/protocols'

const mockTodo: Todo = {
  id: faker.random.uuid(),
  title: faker.random.words(3),
  completed: false,
  dueDate: new Date(),
  theme: 'blank'
}

export class AddTodoRepositorySpy implements AddTodoRepository {
  dueDate: Date
  title: string
  theme: string
  result = mockTodo

  async add({
    dueDate,
    title,
    theme
  }: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    this.dueDate = dueDate
    this.title = title
    this.theme = theme
    return this.result
  }
}

export class DeleteTodoRepositorySpy implements DeleteTodoRepository {
  id: string

  async delete(id: string): Promise<void> {
    this.id = id
  }

  async deleteCompleted(): Promise<void> {
    return null
  }
}

export class UpdateTodoRepositorySpy implements UpdateTodoRepository {
  params = {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  result = mockTodo

  async update(
    params: UpdateTodoRepository.Params
  ): Promise<UpdateTodoRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadTodosRepositorySpy implements LoadTodosRepository {
  result = [mockTodo]

  async loadAll(): Promise<LoadTodosRepository.Result[]> {
    return this.result
  }
}

export class LoadTodoRepositorySpy implements LoadTodoRepository {
  id = faker.random.uuid()
  result = mockTodo

  async load(
    todo: LoadTodoRepository.Param
  ): Promise<LoadTodoRepository.Result> {
    this.id = todo.id
    return this.result
  }
}
