import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'
import { DateValidation } from '@/validation/protocols'

export class DateValidator implements Validation {
  constructor(
    private readonly field: string,
    private readonly dateValidation: DateValidation
  ) {}

  validate(input: any): Error {
    if (input[this.field]) {
      if (!this.dateValidation.validate(input[this.field])) {
        return new InvalidParamError(this.field)
      }
    }
  }
}
