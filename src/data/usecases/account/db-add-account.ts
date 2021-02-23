import { CheckAccountByEmailRepository } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(account.email)
    const isValid = false
    return isValid
  }
}
