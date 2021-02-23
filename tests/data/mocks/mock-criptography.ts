import faker from 'faker'

import { Hasher } from '@/data/protocols'

export class HasherSpy implements Hasher {
  result = faker.random.uuid()
  plaintext: string

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.result
  }
}
