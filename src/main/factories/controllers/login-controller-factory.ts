import { LoginController } from '@/presentation/controllers'
import { makeLoginValidation, makeDbAuthentication } from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  return new LoginController(makeLoginValidation(), makeDbAuthentication())
}
