import {
  addTodoPath,
  loadTodoPath,
  loadTodosPath,
  updateTodoPath,
  deleteCompletedTodosPath
} from './todos'

export const todosPath = {
  '/todos': {
    ...addTodoPath,
    ...loadTodosPath,
    ...updateTodoPath
  },
  '/todos/{id}': {
    ...loadTodoPath
  },
  '/todos-completed': {
    ...deleteCompletedTodosPath
  }
}
