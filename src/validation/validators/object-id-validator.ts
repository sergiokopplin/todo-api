import { InvalidParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';
import { ObjectIdValidation } from '@/validation/protocols';

export class ObjectIdValidator implements Validation {
  constructor(
    private readonly field: string,
    private readonly objectIdValidation: ObjectIdValidation,
  ) {}

  validate(input: any): Error {
    if (input[this.field]) {
      if (!this.objectIdValidation.validate(input[this.field])) {
        return new InvalidParamError('id');
      }
    }
  }
}
