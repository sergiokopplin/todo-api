import faker from 'faker'

import { Hasher, HashComparer, Encrypter } from '@/data/protocols'

export class HasherSpy implements Hasher {
  result = faker.random.uuid()
  plaintext: string

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.result
  }
}

export class HashComparerSpy implements HashComparer {
  result = true
  plaintext: string
  digest: string

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext
    this.digest = digest
    return this.result
  }
}

export class EncrypterSpy implements Encrypter {
  result = faker.random.uuid()
  plaintext: string

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext
    return this.result
  }
}
