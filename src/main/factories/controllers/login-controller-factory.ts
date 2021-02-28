import { LoginController } from '@/presentation/controllers'
import { makeSignupValidation } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  return new LoginController(makeSignupValidation())
}
