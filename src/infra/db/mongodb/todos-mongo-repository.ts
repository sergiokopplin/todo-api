import { ObjectId } from 'mongodb'
import { MongoHelper, RepositoryHelper } from '@/infra/db'
import {
  AddTodoRepository,
  DeleteTodoRepository,
  UpdateTodoRepository,
  LoadTodosRepository,
  LoadTodoRepository
} from '@/data/protocols'

export class TodosMongoRepository
  implements
    AddTodoRepository,
    DeleteTodoRepository,
    UpdateTodoRepository,
    LoadTodosRepository,
    LoadTodoRepository {
  async add(todo: AddTodoRepository.Params): Promise<AddTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.insertOne(
      RepositoryHelper.mapValidKeys(
        {
          theme: todo.theme || 'blank',
          completed: false
        },
        todo
      )
    )
    return MongoHelper.mapId(result.ops[0])
  }

  async delete(id: string): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteOne({ _id: new ObjectId(id) })
  }

  async deleteCompleted(): Promise<void> {
    const collection = await MongoHelper.getCollection('todos')
    await collection.deleteMany({
      completed: true
    })
  }

  async update(
    todo: UpdateTodoRepository.Params
  ): Promise<UpdateTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.findOneAndReplace(
      { _id: new ObjectId(todo.id) },
      RepositoryHelper.mapValidKeys(
        {
          theme: 'blank'
        },
        todo
      ),
      { returnOriginal: false }
    )
    return result.value && MongoHelper.mapId(result.value)
  }

  async loadAll(): Promise<LoadTodosRepository.Result[]> {
    const collection = await MongoHelper.getCollection('todos')
    const result = collection.find()
    const list = await result.toArray()
    return result && list.map(item => MongoHelper.mapId(item))
  }

  async load(
    todo: LoadTodoRepository.Param
  ): Promise<LoadTodoRepository.Result> {
    const collection = await MongoHelper.getCollection('todos')
    const result = await collection.findOne({ _id: new ObjectId(todo.id) })
    return result && MongoHelper.mapId(result)
  }
}
