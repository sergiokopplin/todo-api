import request from 'supertest'
import { Collection } from 'mongodb'
import faker from 'faker'

import { MongoHelper } from '@/infra/db'
import app from '@/main/config/app'

let accountCollection: Collection

describe('Account Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should return 200 on signup', async () => {
    app.post('/api/signup', (req, res) => {
      res.send(req.body)
    })

    const password = faker.internet.password()
    const account = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password,
      passwordConfirmation: password
    }

    await request(app).post('/api/signup').send(account).expect(200)
    await request(app).post('/api/signup').send(account).expect(403)
  })
})