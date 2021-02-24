import { Collection } from 'mongodb'

import { MongoHelper, AccountMongoRepository } from '@/infra/db'
import { mockAddAccountParams } from '@/tests/domain/mocks'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('AccountMongoRepository', () => {
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

  describe('add()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut()
      const result = await sut.add(mockAddAccountParams())
      expect(result).toBe(true)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true on success', async () => {
      const account = mockAddAccountParams()
      const sut = makeSut()
      await accountCollection.insertOne({ ...account })
      const result = await sut.checkByEmail(account.email)
      expect(result).toBe(true)
    })
  })
})
