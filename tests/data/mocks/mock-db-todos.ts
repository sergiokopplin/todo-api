import faker from 'faker'

import {
  AddTodoRepository,
  DeleteTodoRepository,
  LoadTodosRepository,
  UpdateTodoRepository
} from '@/data/protocols'

export class AddTodoRepositorySpy implements AddTodoRepository {
  title: string
  result = {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  async add(title: string): Promise<AddTodoRepository.Result> {
    this.title = title
    return this.result
  }
}

export class DeleteTodoRepositorySpy implements DeleteTodoRepository {
  id: string

  async delete(id: string): Promise<void> {
    this.id = id
  }
}

export class UpdateTodoRepositorySpy implements UpdateTodoRepository {
  params = {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  result = {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  async update(
    params: UpdateTodoRepository.Params
  ): Promise<UpdateTodoRepository.Result> {
    this.params = params
    return this.result
  }
}

export class LoadTodosRepositorySpy implements LoadTodosRepository {
  result = [
    {
      id: faker.random.uuid(),
      title: faker.random.words(3),
      completed: false
    }
  ]

  async loadAll(): Promise<LoadTodosRepository.Result[]> {
    return this.result
  }
}
