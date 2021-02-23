import { Account } from '@/domain/models'

export interface AddAccountRepository {
  add: (
    account: AddAccountRepository.Params
  ) => Promise<AddAccountRepository.Result>
}

export namespace AddAccountRepository {
  export type Params = Account
  export type Result = boolean
}
