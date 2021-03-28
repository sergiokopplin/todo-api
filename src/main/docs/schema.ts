import {
  accountSchema,
  todoSchema,
  todosSchema,
  errorSchema,
  loginParamsSchema,
  signupParamsSchema,
  addTodoParamsSchema,
  loadTodoParamsSchema,
  updateTodoParamsSchema,
} from './schemas/';

export default {
  account: accountSchema,
  todo: todoSchema,
  todos: todosSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  addTodoParams: addTodoParamsSchema,
  loadTodoParams: loadTodoParamsSchema,
  updateTodoParams: updateTodoParamsSchema,
};
