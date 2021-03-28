import { ObjectIdValidatorAdapter } from '@/infra/validators';
import { ValidationBuilder, ValidationComposite } from '@/validation/validators';

export const makeLoadTodoValidation = (): ValidationComposite =>
  ValidationComposite.build([
    ...ValidationBuilder.field('id').required().objectId(new ObjectIdValidatorAdapter()).build(),
  ]);
