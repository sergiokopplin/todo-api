import { Todo } from '@/domain/models';

export interface UpdateTodo {
  update: (todo: UpdateTodo.Params) => Promise<UpdateTodo.Result>;
}

export namespace UpdateTodo {
  export type Params = Todo;
  export type Result = Todo;
}
