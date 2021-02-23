import { CheckAccountByEmailRepository } from '@/data/protocols'

export class CheckAccountByEmailRepositorySpy
  implements CheckAccountByEmailRepository {
  email: string
  result = false

  async checkByEmail(
    email: string
  ): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
