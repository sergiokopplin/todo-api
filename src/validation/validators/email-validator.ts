import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'
import { EmailValidation } from '@/validation/protocols'

export class EmailValidator implements Validation {
  constructor (private readonly field: string, private readonly emailValidation: EmailValidation) {}

  validate (input: any): Error {
    if (input[this.field]) {
      if (!this.emailValidation.validate(input[this.field])) {
        return new InvalidParamError('email')
      }
    }
  }
}
