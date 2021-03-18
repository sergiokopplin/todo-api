import { AddTodoRepository } from '@/data/protocols'
import { AddTodo } from '@/domain/usecases'

export class DbAddTodo implements AddTodo {
  constructor(private readonly addTodoRepository: AddTodoRepository) {}

  async add(todo: AddTodo.Params): Promise<AddTodo.Result> {
    return await this.addTodoRepository.add({
      title: todo.title,
      dueDate: todo.dueDate
    })
  }
}
