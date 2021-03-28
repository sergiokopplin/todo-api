import faker from 'faker';

import { Hasher, HashComparer, Encrypter, Decrypter } from '@/data/protocols';

export class HasherSpy implements Hasher {
  result = faker.datatype.uuid();
  plaintext: string;

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.result;
  }
}

export class HashComparerSpy implements HashComparer {
  result = true;
  plaintext: string;
  digest: string;

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return this.result;
  }
}

export class EncrypterSpy implements Encrypter {
  result = faker.datatype.uuid();
  plaintext: string;

  async encrypt(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.result;
  }
}

export class DecrypterSpy implements Decrypter {
  plaintext = faker.internet.password();
  ciphertext: string;

  async decrypt(ciphertext: string): Promise<string> {
    this.ciphertext = ciphertext;
    return this.plaintext;
  }
}
