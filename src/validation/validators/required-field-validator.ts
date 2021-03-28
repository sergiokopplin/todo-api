import { MissingParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';

export class RequiredFieldValidator implements Validation {
  constructor(private readonly field: string) {}

  validate(input: any): Error {
    if (!input[this.field] && typeof input[this.field] === 'undefined') {
      return new MissingParamError(this.field);
    }
  }
}
