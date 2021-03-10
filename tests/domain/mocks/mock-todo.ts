import { AddTodo, DeleteTodo, UpdateTodo, LoadTodo } from '@/domain/usecases'

import faker from 'faker'

export const mockAddTodoParams = (): AddTodo.Params => ({
  title: faker.random.words(3)
})

export const mockDeleteTodoParams = (): DeleteTodo.Params => ({
  id: faker.random.uuid()
})

export const mockUpdateTodoParams = (): UpdateTodo.Params => ({
  title: faker.random.words(3),
  completed: false,
  id: faker.random.uuid()
})

export const mockLoadTodoParams = (): LoadTodo.Param => ({
  id: faker.random.uuid()
})
