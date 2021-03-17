import { EmailValidatorAdapter } from '@/infra/validators'
import { makeLoginValidation } from '@/main/factories'
import {
  EmailValidator,
  RequiredFieldValidator,
  ValidationComposite
} from '@/validation/validators'

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    const composite = makeLoginValidation()
    expect(composite).toEqual(
      ValidationComposite.build([
        new RequiredFieldValidator('email'),
        new EmailValidator('email', new EmailValidatorAdapter()),
        new RequiredFieldValidator('password')
      ])
    )
  })
})
