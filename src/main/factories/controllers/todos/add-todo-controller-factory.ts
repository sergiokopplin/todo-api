import { makeAddTodoValidation, makeDbAddTodo, makeLogControllerDecorator } from '@/main/factories';
import { AddTodoController } from '@/presentation/controllers';
import { Controller } from '@/presentation/protocols';

export const makeAddTodoController = (): Controller => {
  const controller = new AddTodoController(makeAddTodoValidation(), makeDbAddTodo());
  return makeLogControllerDecorator(controller);
};
