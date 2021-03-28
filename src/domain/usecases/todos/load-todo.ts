import { Todo } from '@/domain/models';

export interface LoadTodo {
  load: (todo: LoadTodo.Param) => Promise<LoadTodo.Result>;
}

export namespace LoadTodo {
  export interface Param {
    id: string;
    accountId: string;
  }

  export type Result = Todo;
}
