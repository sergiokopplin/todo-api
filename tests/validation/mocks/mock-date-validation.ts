import { DateValidation } from '@/validation/protocols'

export class DateValidationSpy implements DateValidation {
  date: DateValidation.date
  result = true

  validate (date: Date): boolean {
    this.date = date
    return this.result
  }
}
