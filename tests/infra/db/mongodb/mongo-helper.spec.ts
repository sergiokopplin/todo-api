import { faker } from '@faker-js/faker';
import { Collection } from 'mongodb';

import { MongoHelper as sut } from '@/infra/db';

let accountsCollection: Collection;

describe('MongoHelper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    accountsCollection = await sut.getCollection('accounts');
    await accountsCollection.deleteMany({});
  });

  afterAll(async () => {
    await sut.disconnect();
  });

  test('Should reconnect is mongodb is down', async () => {
    let accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
    await sut.disconnect();
    accountCollection = await sut.getCollection('accounts');
    expect(accountCollection).toBeTruthy();
  });

  test('Should mapId correctly', async () => {
    const request = {
      _id: faker.datatype.uuid(),
      email: faker.internet.email(),
      name: faker.name.fullName(),
    };
    const result = sut.mapId(request);
    expect(result).toEqual({
      id: request._id,
      email: request.email,
      name: request.name,
    });
  });
});
