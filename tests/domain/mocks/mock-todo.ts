import { AddTodo } from '@/domain/usecases'

import faker from 'faker'

export const mockAddTodoParams = (): AddTodo.Params => ({
  title: faker.random.words(3)
})
