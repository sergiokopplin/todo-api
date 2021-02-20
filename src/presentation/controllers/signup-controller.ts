import { AddAccount } from '@/domain/usecases'
import { Controller, HttpResponse } from '@/presentation/protocols'
import { serverError, forbiddenError } from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}

  async handle (request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const isValid = await this.addAccount.add(request)
      if (!isValid) {
        return forbiddenError(new EmailInUseError())
      }
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
