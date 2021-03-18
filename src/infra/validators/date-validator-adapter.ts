import { DateValidation } from '@/validation/protocols'

import validator from 'validator'

export class DateValidatorAdapter implements DateValidation {
  validate(date: Date): boolean {
    if (!date) return true
    return validator.isISO8601(date.toString())
  }
}
