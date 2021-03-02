import request from 'supertest'
import { Collection } from 'mongodb'
import faker from 'faker'

import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'

let accountCollection: Collection

describe('Todo Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('todos')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Add Todo', () => {
    test('Should return 200 on add-todo', async () => {
      app.post('/api/add-todo', (req, res) => {
        res.send(req.body)
      })

      const todo = {
        title: faker.random.words(3)
      }

      await request(app).post('/api/add-todo').send(todo).expect(200)
    })

    test('Should return 200 when adds multiple todos in sequence', async () => {
      app.post('/api/add-todo', (req, res) => {
        res.send(req.body)
      })

      const todo = {
        title: faker.random.words(3)
      }

      await request(app).post('/api/add-todo').send(todo).expect(200)
      await request(app).post('/api/add-todo').send(todo).expect(200)
      await request(app).post('/api/add-todo').send(todo).expect(200)
    })
  })

  describe('Delete Todo', () => {
    test('Should return 204 on delete-todo', async () => {
      app.post('/api/delete-todo', (req, res) => {
        res.send(req.body)
      })

      const todo = {
        id: faker.random.uuid()
      }

      await request(app).post('/api/delete-todo').send(todo).expect(204)
    })
  })
})
