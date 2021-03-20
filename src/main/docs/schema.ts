import {
  accountSchema,
  todoSchema,
  errorSchema,
  loginParamsSchema,
  signupParamsSchema,
  addTodoParamsSchema,
  loadTodoParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  todo: todoSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema,
  addTodoParams: addTodoParamsSchema,
  loadTodoParams: loadTodoParamsSchema
}
