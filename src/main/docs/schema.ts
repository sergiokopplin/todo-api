import {
  accountSchema,
  errorSchema,
  loginParamsSchema,
  signupParamsSchema
} from './schemas/'

export default {
  account: accountSchema,
  error: errorSchema,
  loginParams: loginParamsSchema,
  signupParams: signupParamsSchema
}
