import { addTodoPath, loadTodoPath } from './todos'

export const todosPath = {
  ...addTodoPath,
  ...loadTodoPath
}
