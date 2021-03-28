import {
  addTodoPath,
  loadTodoPath,
  loadTodosPath,
  updateTodoPath,
  deleteTodoPath,
  deleteCompletedTodosPath,
} from './todos';

export const todosPath = {
  '/todos': {
    ...addTodoPath,
    ...loadTodosPath,
    ...updateTodoPath,
  },
  '/todos/{id}': {
    ...loadTodoPath,
    ...deleteTodoPath,
  },
  '/todos-completed': {
    ...deleteCompletedTodosPath,
  },
};
