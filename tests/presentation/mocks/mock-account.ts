import faker from 'faker'

import { AddAccount, Authentication } from '@/domain/usecases'

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = true

  async add(params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params
  result = {
    accessToken: faker.random.uuid(),
    name: faker.name.findName()
  }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params
    return this.result
  }
}
