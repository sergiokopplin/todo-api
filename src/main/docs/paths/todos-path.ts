import {
  addTodoPath,
  loadTodoPath,
  loadTodosPath,
  updateTodoPath
} from './todos'

export const todosPath = {
  '/todos': {
    ...addTodoPath,
    ...loadTodosPath,
    ...updateTodoPath
  },
  '/todos/{id}': {
    ...loadTodoPath
  }
}
