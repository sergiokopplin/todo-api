import faker from 'faker';
import { Collection } from 'mongodb';

import { MongoHelper, AccountMongoRepository } from '@/infra/db';
import { mockAddAccountParams } from '@/tests/domain/mocks';

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository();
};

let accountCollection: Collection;

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('add()', () => {
    test('Should return true on success', async () => {
      const sut = makeSut();
      const result = await sut.add(mockAddAccountParams());
      expect(result).toBe(true);
    });
  });

  describe('checkByEmail()', () => {
    test('Should return true on success', async () => {
      const account = mockAddAccountParams();
      const sut = makeSut();
      await accountCollection.insertOne({ ...account });
      const result = await sut.checkByEmail(account.email);
      expect(result).toBe(true);
    });
  });

  describe('loadByEmail()', () => {
    test('Should return name and accessToken on success', async () => {
      const account = mockAddAccountParams();
      const sut = makeSut();
      await accountCollection.insertOne({ ...account });
      const result = await sut.loadByEmail(account.email);
      expect(result.id).toBeTruthy();
      expect(result.name).toBe(account.name);
      expect(result.password).toBe(account.password);
    });
  });

  describe('updateAccessToken()', () => {
    test('Should update the account accessToken on success', async () => {
      const mockAccount = mockAddAccountParams();
      const sut = makeSut();
      const account = await accountCollection.insertOne({ ...mockAccount });
      expect(account.ops[0].accessToken).toBeFalsy();
      const accessToken = faker.datatype.uuid();
      await sut.updateAccessToken(account.ops[0]._id, accessToken);
      const updatedAccount = await accountCollection.findOne({
        _id: account.ops[0]._id,
      });
      expect(updatedAccount.accessToken).toBe(accessToken);
    });
  });

  describe('loadByToken()', () => {
    let name = faker.name.findName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    let accessToken = faker.datatype.uuid();

    beforeEach(() => {
      name = faker.name.findName();
      email = faker.internet.email();
      password = faker.internet.password();
      accessToken = faker.datatype.uuid();
    });

    test('Should return an account on loadByToken without role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
      });
      const account = await sut.loadByToken(accessToken);
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
    });

    test('Should return an account on loadByToken with admin role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin',
      });
      const account = await sut.loadByToken(accessToken, 'admin');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
    });

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
      });
      const account = await sut.loadByToken(accessToken, 'admin');
      expect(account).toBeFalsy();
    });

    test('Should return an account on loadByToken with if user is admin', async () => {
      const sut = makeSut();
      await accountCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin',
      });
      const account = await sut.loadByToken(accessToken);
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
    });

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut();
      const account = await sut.loadByToken(accessToken);
      expect(account).toBeFalsy();
    });
  });
});
