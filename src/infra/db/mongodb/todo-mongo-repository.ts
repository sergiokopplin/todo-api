import { MongoHelper } from '@/infra/db'
import { AddTodoRepository, DeleteTodoRepository } from '@/data/protocols'

export class TodoMongoRepository
  implements AddTodoRepository, DeleteTodoRepository {
  async add(title: string): Promise<AddTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.insertOne({ title, completed: false })
    return MongoHelper.mapId(result.ops[0])
  }

  async delete(id: string): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteOne({ _id: id })
  }
}
