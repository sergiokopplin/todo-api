import { DateValidation } from '@/validation/protocols'

import validator from 'validator'

export class DateValidatorAdapter implements DateValidation {
  validate(date: Date): boolean {
    return validator.isISO8601(date.toString())
  }
}
