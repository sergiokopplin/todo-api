import { Validation } from '@/presentation/protocols'
import { InvalidParamError } from '@/presentation/errors'

export class MinLengthValidator implements Validation {
  constructor(
    private readonly field: string,
    private readonly minLength: number
  ) {}

  validate(input: any): Error {
    if (input[this.field]?.length < this.minLength) {
      return new InvalidParamError(this.field)
    }
  }
}
