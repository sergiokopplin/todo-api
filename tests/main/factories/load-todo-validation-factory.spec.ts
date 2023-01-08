import { ObjectIdValidatorAdapter } from '@/infra/validators'
import { makeLoadTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator,
  ObjectIdValidator
} from '@/validation/validators'

describe('LoadTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const composite = makeLoadTodoValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('id'),
        new ObjectIdValidator('id', new ObjectIdValidatorAdapter())
      ])
    )
  })
})
