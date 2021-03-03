import { Account } from '@/domain/models'

export interface Authentication {
  auth: (account: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export type Params = Account
  export interface Result {
    accessToken: string
    name: string
  }
}
