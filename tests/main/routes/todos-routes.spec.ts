import request from 'supertest'
import { Collection } from 'mongodb'
import faker from 'faker'

import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'
import { mockAddTodoParams } from '@/tests/domain/mocks'

let todosCollection: Collection

describe('Todos Routes', () => {
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

  describe('Todos', () => {
    describe('add', () => {
      test('Should return 200 on add', async () => {
        app.post('/api/todos', (req, res) => {
          res.send(req.body)
        })

        const todo = {
          title: faker.random.words(3)
        }

        await request(app).post('/api/todos').send(todo).expect(200)
      })
    })

    describe('delete', () => {
      test('Should return 204 on delete', async () => {
        const todo = mockAddTodoParams()
        const result = await todosCollection.insertOne({ todo })

        app.delete('/api/todos', (req, res) => {
          res.send(req.body)
        })

        const todoRequest = {
          id: result.ops[0]._id
        }

        await request(app).delete('/api/todos').send(todoRequest).expect(204)
      })
    })
  })
})
