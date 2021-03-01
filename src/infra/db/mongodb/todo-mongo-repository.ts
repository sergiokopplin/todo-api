import { MongoHelper } from '@/infra/db'
import { AddTodoRepository } from '@/data/protocols'

export class TodoMongoRepository implements AddTodoRepository {
  async add(title: string): Promise<AddTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.insertOne({ title, completed: false })
    return MongoHelper.mapId(result.ops[0])
  }
}
