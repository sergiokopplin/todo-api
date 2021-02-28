import { SignUpController } from '@/presentation/controllers'
import {
  makeSignupValidation,
  makeDbAddAccount,
  makeDbAuthentication
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeSignupController = (): Controller => {
  return new SignUpController(
    makeSignupValidation(),
    makeDbAddAccount(),
    makeDbAuthentication()
  )
}
