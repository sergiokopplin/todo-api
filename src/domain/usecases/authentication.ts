export interface Authentication {
  auth: (account: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export interface Params {
    name: string
    email: string
    password: string
  }

  export interface Result {
    accessToken: string
    name: string
  }
}
