import {
  makeSignupValidation,
  makeDbAddAccount,
  makeDbAuthentication,
  makeLogControllerDecorator
} from '@/main/factories'
import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'

export const makeSignupController = (): Controller => {
  const controller = new SignUpController(
    makeSignupValidation(),
    makeDbAddAccount(),
    makeDbAuthentication()
  )
  return makeLogControllerDecorator(controller)
}
