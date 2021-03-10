import faker from 'faker'

import {
  AddTodoRepository,
  DeleteTodoRepository,
  LoadTodosRepository,
  UpdateTodoRepository,
  LoadTodoRepository
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

export class LoadTodoRepositorySpy implements LoadTodoRepository {
  id = faker.random.uuid()
  result = {
    id: faker.random.uuid(),
    title: faker.random.words(3),
    completed: false
  }

  async load(
    todo: LoadTodoRepository.Param
  ): Promise<LoadTodoRepository.Result> {
    this.id = todo.id
    return this.result
  }
}
