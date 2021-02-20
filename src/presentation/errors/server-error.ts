export class ServerError extends Error {
  constructor (stack: string) {
    super('Internal Server Error')
    this.name = 'Something Unexpected Happen'
    this.stack = stack
  }
}
