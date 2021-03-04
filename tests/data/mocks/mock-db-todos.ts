import faker from 'faker'

import { AddTodoRepository, DeleteTodoRepository } from '@/data/protocols'

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
