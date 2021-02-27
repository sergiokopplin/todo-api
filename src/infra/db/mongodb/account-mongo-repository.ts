import { MongoHelper } from '@/infra/db'
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols'

export class AccountMongoRepository
  implements
    AddAccountRepository,
    CheckAccountByEmailRepository,
    LoadAccountByEmailRepository,
    UpdateAccessTokenRepository {
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

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Result> {
    const collection = await MongoHelper.getCollection('accounts')
    const result = await collection.findOne(
      { email },
      {
        projection: {
          _id: 1,
          name: 1,
          password: 1
        }
      }
    )
    return MongoHelper.mapId(result)
  }

  async updateAccessToken(id: string, token: string): Promise<void> {
    const collection = await MongoHelper.getCollection('accounts')
    await collection.updateOne(
      {
        _id: id
      },
      {
        $set: {
          accessToken: token
        }
      }
    )
  }
}
