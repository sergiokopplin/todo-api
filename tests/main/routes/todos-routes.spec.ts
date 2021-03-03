import request from 'supertest'
import { Collection } from 'mongodb'
import faker from 'faker'

import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'

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
      test('Should return 200 on signup', async () => {
        app.post('/api/todos', (req, res) => {
          res.send(req.body)
        })

        const todo = {
          title: faker.random.words(3)
        }

        await request(app).post('/api/todos').send(todo).expect(200)
      })
    })
  })
})
