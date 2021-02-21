import { AddAccount, Authentication } from '@/domain/usecases'
import { Controller, HttpResponse, Validation } from '@/presentation/protocols'
import {
  serverError,
  forbiddenError,
  badRequestError
} from '@/presentation/helpers'
import { EmailInUseError } from '@/presentation/errors'

export class SignUpController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle(request: SignUpController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequestError(error)
      }
      const isValid = await this.addAccount.add(request)
      if (!isValid) {
        return forbiddenError(new EmailInUseError())
      }
      await this.authentication.auth(request)
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
