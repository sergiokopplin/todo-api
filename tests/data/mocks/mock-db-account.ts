import faker from 'faker'
import {
  AddAccountRepository,
  CheckAccountByEmailRepository,
  LoadAccountByEmailRepository
} from '@/data/protocols'
import { Account } from '@/domain/models'

export class CheckAccountByEmailRepositorySpy
  implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail(
    email: string
  ): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  account: Account
  result = true

  async add(
    account: AddAccountRepository.Params
  ): Promise<AddAccountRepository.Result> {
    this.account = account
    return this.result
  }
}

export class LoadAccountByEmailRepositorySpy
  implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: faker.random.uuid(),
    name: faker.name.findName(),
    password: faker.internet.password()
  }

  async loadByEmail(
    email: string
  ): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
