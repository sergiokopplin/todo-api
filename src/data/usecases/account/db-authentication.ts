import { Authentication } from '@/domain/usecases'

import { HashComparer, LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      params.email
    )
    if (account) {
      await this.hashComparer.compare(params.password, account.password)
    }
    return null
  }
}
