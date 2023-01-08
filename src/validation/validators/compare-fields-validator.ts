import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class CompareFieldsValidator implements Validation {
  constructor (private readonly field: string, private readonly fieldToCompare: string) {}

  validate (input: any): Error {
    if (input[this.field] && input[this.fieldToCompare]) {
      if (input[this.field] !== input[this.fieldToCompare]) {
        return new InvalidParamError(this.field)
      }
    }
  }
}
