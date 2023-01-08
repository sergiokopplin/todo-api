import { InvalidParamError } from '@/presentation/errors'
import { Validation } from '@/presentation/protocols'

export class MinLengthValidator implements Validation {
  constructor (private readonly field: string, private readonly minLength: number) {}

  validate (input: any): Error {
    if (input[this.field]) {
      if (input[this.field].length < this.minLength) {
        return new InvalidParamError(this.field)
      }
    }
  }
}
