export class InvalidParamError extends Error {
  constructor (field: string) {
    super(`Invalid Param: ${field}`)
    this.name = 'InvalidParamError'
  }
}
