import { Authentication } from '@/domain/usecases'

import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository
} from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      params.email
    )
    if (account) {
      const isValid = await this.hashComparer.compare(
        params.password,
        account.password
      )
      if (isValid) {
        await this.encrypter.encrypt(params.password)
      }
    }
    return null
  }
}
