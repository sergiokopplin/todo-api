import { AddTodo, DeleteTodo } from '@/domain/usecases'

import faker from 'faker'

export const mockAddTodoParams = (): AddTodo.Params => ({
  title: faker.random.words(3)
})

export const mockDeleteTodoParams = (): DeleteTodo.Params => ({
  id: faker.random.uuid()
})
