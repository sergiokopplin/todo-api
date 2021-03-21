import { Collection } from 'mongodb'

import { MongoHelper, TodosMongoRepository } from '@/infra/db'
import { mockAddTodoParams } from '@/tests/domain/mocks'

const makeSut = (): TodosMongoRepository => {
  return new TodosMongoRepository()
}

let todosCollection: Collection

describe('TodosMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    todosCollection = await MongoHelper.getCollection('todos')
    await todosCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('add()', () => {
    test('Should return an todo on success', async () => {
      const sut = makeSut()
      const result = await sut.add({ title: mockAddTodoParams().title })
      expect(result.id).toBeTruthy()
      expect(result.title).toBe(mockAddTodoParams().title)
      expect(result.theme).toBe('blank')
      expect(result.completed).toBe(false)
    })

    test('Should return correctly with optional params', async () => {
      const sut = makeSut()
      const result = await sut.add({
        title: mockAddTodoParams().title,
        dueDate: new Date('2021-03-17T23:18:04.822Z'),
        theme: 'custom'
      })
      expect(result.id).toBeTruthy()
      expect(result.theme).toBe('custom')
      expect(result.dueDate).toEqual(new Date('2021-03-17T23:18:04.822Z'))
    })
  })

  describe('delete()', () => {
    test('Should return 0 on count', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await todosCollection.insertOne({ todo })
      let count = await todosCollection.countDocuments()
      expect(count).toBe(1)
      await sut.delete(result.ops[0]._id)
      count = await todosCollection.countDocuments()
      expect(count).toBe(0)
    })
  })

  describe('deleteCompleted()', () => {
    test('Should return 1 on count', async () => {
      const sut = makeSut()
      await todosCollection.insertOne({
        ...mockAddTodoParams(),
        completed: true
      })
      await todosCollection.insertOne({
        ...mockAddTodoParams(),
        completed: false
      })
      await todosCollection.insertOne({
        ...mockAddTodoParams(),
        completed: true
      })
      let count = await todosCollection.countDocuments()
      expect(count).toBe(3)
      await sut.deleteCompleted()
      count = await todosCollection.countDocuments()
      expect(count).toBe(1)
    })
  })

  describe('update()', () => {
    test('Should return an updated todo', async () => {
      const sut = makeSut()
      const todo = mockAddTodoParams()
      const result = await todosCollection.insertOne(todo)
      const updateResult = await sut.update({
        id: result.ops[0]._id,
        completed: false,
        title: 'new title',
        dueDate: new Date('2021-03-17T23:18:04.822Z'),
        theme: 'blank'
      })
      expect(updateResult).toEqual({
        id: result.ops[0]._id,
        completed: false,
        title: 'new title',
        dueDate: new Date('2021-03-17T23:18:04.822Z'),
        theme: 'blank'
      })
    })

    test('Should return empty when not existing todo to update', async () => {
      const sut = makeSut()
      const updateResult = await sut.update({
        id: '60480d9b39bab84bf07eac95',
        completed: true,
        title: 'new title',
        dueDate: new Date('2021-03-17T23:18:04.822Z'),
        theme: 'blank'
      })
      expect(updateResult).toEqual(null)
    })
  })

  describe('loadAll()', () => {
    test('Should return all todos', async () => {
      const sut = makeSut()
      await todosCollection.insertOne({
        title: 'first title',
        completed: true
      })
      await todosCollection.insertOne({
        title: 'second title',
        completed: false
      })
      const loadAllResult = await sut.loadAll()
      const count = await todosCollection.countDocuments()
      expect(count).toBe(2)
      expect(loadAllResult.length).toBe(2)
    })

    test('Should return empty todos', async () => {
      const sut = makeSut()
      const loadAllResult = await sut.loadAll()
      const count = await todosCollection.countDocuments()
      expect(count).toBe(0)
      expect(loadAllResult.length).toBe(0)
    })
  })

  describe('load()', () => {
    test('Should return a todo', async () => {
      const sut = makeSut()
      const result = await todosCollection.insertOne({
        title: 'first title',
        completed: true
      })
      const loadAllResult = await sut.load({ id: result.insertedId })
      expect(loadAllResult).toEqual({
        id: result.insertedId,
        title: 'first title',
        completed: true
      })
    })

    test('Should return an empty todo when no results', async () => {
      const sut = makeSut()
      const loadAllResult = await sut.load({ id: '6048177f57568d02bfca0f0f' })
      expect(loadAllResult).toEqual(null)
    })
  })
})
