import { ObjectIdValidation } from '@/validation/protocols';

export class ObjectIdValidationSpy implements ObjectIdValidation {
  id: ObjectIdValidation.id;
  result = true;

  validate(id: string): boolean {
    this.id = id;
    return this.result;
  }
}
