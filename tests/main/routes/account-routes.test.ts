import { hash } from 'bcrypt';
import faker from 'faker';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra/db';
import app from '@/main/config/app';

let accountCollection: Collection;

describe('Account Routes', () => {
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

  describe('Signup', () => {
    test('Should return 200 on signup', async () => {
      app.post('/api/signup', (req, res) => {
        res.send(req.body);
      });

      const validPassword = 'aS1!sQ2!';
      const account = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: validPassword,
        passwordConfirmation: validPassword,
      };

      await request(app).post('/api/signup').send(account).expect(200);
    });

    test('Should return 403 when trying to add an existing account', async () => {
      app.post('/api/signup', (req, res) => {
        res.send(req.body);
      });

      const validPassword = 'aS1!sQ2!';
      const account = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: validPassword,
        passwordConfirmation: validPassword,
      };

      await request(app).post('/api/signup').send(account);
      await request(app).post('/api/signup').send(account).expect(403);
    });
  });

  describe('Login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12);
      await accountCollection.insertOne({
        name: 'Sergio',
        email: 'sergio@gmail.com',
        password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'sergio@gmail.com',
          password: '123',
        })
        .expect(200);
    });

    test('Should return 401 when bad credentials', async () => {
      const password = await hash('123', 12);
      await accountCollection.insertOne({
        name: 'Sergio',
        email: 'sergio@gmail.com',
        password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'sergio@gmail.com',
          password: '321',
        })
        .expect(401);
    });
  });
});
