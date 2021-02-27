import jwt from 'jsonwebtoken'

import { Encrypter } from '@/data/protocols/criptography'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}
  encrypt: (plaintext: string) => Promise<string>

  async sign(plaintext: string): Promise<string> {
    return jwt.sign({ id: plaintext }, this.secret)
  }
}
