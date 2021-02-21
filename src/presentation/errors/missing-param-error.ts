export class MissingParamError extends Error {
  constructor(field: string) {
    super(`Missing Param: ${field}`)
    this.name = 'MissingParamError'
  }
}
