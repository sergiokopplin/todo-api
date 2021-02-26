import { Authentication } from '@/domain/usecases'

import { LoadAccountByEmailRepository } from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth(account: Authentication.Params): Promise<Authentication.Result> {
    await this.loadAccountByEmailRepository.loadByEmail(account.email)
    return null
  }
}
