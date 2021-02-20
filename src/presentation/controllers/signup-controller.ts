import { AddAccount } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    await this.addAccount.add(request)
    return null
  }
}

export namespace SignUpController {
  export interface Request {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
