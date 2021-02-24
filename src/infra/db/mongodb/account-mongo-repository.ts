import { MongoHelper } from '@/infra/db'
import {
  AddAccountRepository,
  CheckAccountByEmailRepository
} from '@/data/protocols'

export class AccountMongoRepository
  implements AddAccountRepository, CheckAccountByEmailRepository {
  async add(
    account: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    const collection = await MongoHelper.getCollection('accounts')
    const result = await collection.insertOne(account)
    return result.ops[0] !== null
  }

  async checkByEmail(
    email: string
  ): Promise<CheckAccountByEmailRepository.Result> {
    const collection = await MongoHelper.getCollection('accounts')
    const result = await collection.findOne({ email })
    return result.ops !== null
  }
}
