import { Collection } from 'mongodb'
import faker from 'faker'

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

  describe('loadByEmail()', () => {
    test('Should return name and accessToken on success', async () => {
      const account = mockAddAccountParams()
      const sut = makeSut()
      await accountCollection.insertOne({ ...account })
      const result = await sut.loadByEmail(account.email)
      expect(result.id).toBeTruthy()
      expect(result.name).toBe(account.name)
      expect(result.password).toBe(account.password)
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const mockAccount = mockAddAccountParams()
      const sut = makeSut()
      const account = await accountCollection.insertOne({ ...mockAccount })
      expect(account.ops[0].accessToken).toBeFalsy()
      const accessToken = faker.random.uuid()
      await sut.updateAccessToken(account.ops[0]._id, accessToken)
      const updatedAccount = await accountCollection.findOne({
        _id: account.ops[0]._id
      })
      expect(updatedAccount.accessToken).toBe(accessToken)
    })
  })
})
