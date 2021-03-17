import { makeAddTodoValidation } from '@/main/factories'
import {
  ValidationComposite,
  RequiredFieldValidator,
  MinLengthValidator
} from '@/validation/validators'

describe('AddTodoValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddTodoValidation()
    const composite = makeAddTodoValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('title'),
        new MinLengthValidator('title', 3)
      ])
    )
  })
})
