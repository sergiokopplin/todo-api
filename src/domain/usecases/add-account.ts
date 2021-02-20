export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AddAccount.Result>
}

export namespace AddAccount {
  export interface Params {
    name: string
    email: string
    password: string
  }

  export type Result = boolean
}
