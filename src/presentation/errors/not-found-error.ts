export class NotFoundError extends Error {
  constructor() {
    super('Not Found Error')
    this.name = 'NotFoundError'
  }
}
