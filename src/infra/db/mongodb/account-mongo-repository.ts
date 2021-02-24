import { MongoHelper } from '@/infra/db'
import { AddAccountRepository } from '@/data/protocols'

export class AccountMongoRepository implements AddAccountRepository {
  async add(
    account: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    const collection = await MongoHelper.getCollection('accounts')
    const result = await collection.insertOne(account)
    return result.ops[0] !== null
  }
}
