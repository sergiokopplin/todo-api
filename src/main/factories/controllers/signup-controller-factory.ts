import { SignUpController } from '@/presentation/controllers'
import {
  makeSignupValidation,
  makeDbAddAccount,
  makeAuthentication
} from '@/main/factories'
import { Controller } from '@/presentation/protocols'

export const makeSignupController = (): Controller => {
  return new SignUpController(
    makeSignupValidation(),
    makeDbAddAccount(),
    makeAuthentication()
  )
}
