import { EmailValidation } from '@/validation/protocols'

import validator from 'validator'

export class EmailValidatorAdapter implements EmailValidation {
  validate(email: string): boolean {
    return validator.isEmail(email)
  }
}
