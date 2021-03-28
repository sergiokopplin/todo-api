import faker from 'faker';
import { Collection } from 'mongodb';

import { LogMongoRepository, MongoHelper } from '@/infra/db';

const makeSut = (): LogMongoRepository => {
  return new LogMongoRepository();
};

let errorCollection: Collection;

describe('LogMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    errorCollection = await MongoHelper.getCollection('errors');
    await errorCollection.deleteMany({});
  });

  test('Should create an error log on success', async () => {
    const sut = makeSut();
    await sut.logError(faker.random.words());
    const count = await errorCollection.countDocuments();
    expect(count).toBe(1);
  });
});
