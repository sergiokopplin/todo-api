import { Authentication } from '@/domain/usecases'

import {
  Encrypter,
  HashComparer,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from '@/data/protocols'

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly encrypter: Encrypter,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
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
        const accessToken = await this.encrypter.encrypt(params.password)
        await this.updateAccessTokenRepository.updateAccessToken(
          account.id,
          accessToken
        )
      }
    }
    return null
  }
}
