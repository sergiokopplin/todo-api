import { CheckAccountByEmailRepository, Hasher } from '@/data/protocols'
import { AddAccount } from '@/domain/usecases'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher
  ) {}

  async add(account: AddAccount.Params): Promise<AddAccount.Result> {
    const exists = await this.checkAccountByEmailRepository.checkByEmail(
      account.email
    )
    const isValid = false
    if (!exists) {
      await this.hasher.hash(account.password)
    }
    return isValid
  }
}
