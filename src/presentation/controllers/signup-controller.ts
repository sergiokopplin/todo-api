import { AddAccount } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError } from '@/presentation/helpers'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      await this.addAccount.add(request)
      return null
    } catch (error) {
      return serverError(error)
    }
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
