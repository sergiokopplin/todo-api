import { DateValidatorAdapter } from '@/infra/validators'
import { makeAddTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator,
  MinLengthValidator,
  DateValidator
} from '@/validation/validators'

describe('AddTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddTodoValidation()
    const composite = makeAddTodoValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('title'),
        new MinLengthValidator('title', 3),
        new DateValidator('dueDate', new DateValidatorAdapter())
      ])
    )
  })
})
