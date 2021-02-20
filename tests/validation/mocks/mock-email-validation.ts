import { EmailValidation } from '@/validation/protocols'

export class EmailValidationSpy implements EmailValidation {
  email: EmailValidation.email
  result = true

  validate (email: string): boolean {
    this.email = email
    return this.result
  }
}
