import { DbAddAccount } from '@/data/usecases';
import { BcryptAdapter } from '@/infra/criptography';
import { AccountMongoRepository } from '@/infra/db';

export const makeDbAddAccount = (): DbAddAccount => {
  const accountMongoRepository = new AccountMongoRepository();
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  return new DbAddAccount(accountMongoRepository, bcryptAdapter, accountMongoRepository);
};
