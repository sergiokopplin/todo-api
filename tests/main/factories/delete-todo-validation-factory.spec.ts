import { ObjectIdValidatorAdapter } from '@/infra/validators';
import { makeDeleteTodoValidation } from '@/main/factories';
import {
  ValidationComposite,
  RequiredFieldValidator,
  ObjectIdValidator,
} from '@/validation/validators';

describe('DeleteTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const composite = makeDeleteTodoValidation();
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('id'),
        new ObjectIdValidator('id', new ObjectIdValidatorAdapter()),
      ]),
    );
  });
});
