import {
  CheckAccountByEmailRepository,
  Hasher,
  AddAccountRepository
} from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      account.email
    )
    let isValid = false
    if (!exists) {
      const hashed = await this.hasher.hash(account.password)
      isValid = await this.addAccountRepository.add({
        ...account,
        password: hashed
      })
    }
    return isValid
  }
}
