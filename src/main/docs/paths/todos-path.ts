import { addTodoPath, loadTodoPath, loadTodosPath } from './todos'

export const todosPath = {
  '/todos': {
    ...addTodoPath,
    ...loadTodosPath
  },
  '/todos/{id}': {
    ...loadTodoPath
  }
}
