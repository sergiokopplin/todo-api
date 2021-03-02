import { Collection } from 'mongodb'

import { MongoHelper, TodoMongoRepository } from '@/infra/db'
import { mockAddTodoParams } from '@/tests/domain/mocks'

const makeSut = (): TodoMongoRepository => {
  return new TodoMongoRepository()
}

let todosColletion: Collection

describe('TodoMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    todosColletion = await MongoHelper.getCollection('todos')
    await todosColletion.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await sut.add(todo.title)
      expect(result.id).toBeTruthy()
      expect(result.completed).toBe(false)
      expect(result.title).toBe(todo.title)
    })
  })
})
