import { Todo } from '@/domain/models'

import { AddTodo, DeleteTodo, UpdateTodo, LoadTodo } from '@/domain/usecases'

import faker from 'faker'

const mockTodo: Todo = {
  title: faker.random.words(3),
  completed: false,
  id: faker.random.uuid(),
  dueDate: new Date('2021-03-17T23:18:04.822Z'),
  theme: 'blank'
}

const { title, completed, id, dueDate, theme } = mockTodo

export const mockAddTodoParams = (): AddTodo.Params => ({
  title,
  dueDate,
  theme
})
export const mockDeleteTodoParams = (): DeleteTodo.Params => ({ id })
export const mockLoadTodoParams = (): LoadTodo.Param => ({ id })
export const mockUpdateTodoParams = (): UpdateTodo.Params => ({
  title,
  completed,
  id,
  dueDate,
  theme
})
