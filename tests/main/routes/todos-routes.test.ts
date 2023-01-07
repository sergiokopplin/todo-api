import { faker } from '@faker-js/faker';
import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';
import request from 'supertest';

import { MongoHelper } from '@/infra/db';
import app from '@/main/config/app';
import { env } from '@/main/config/env';
import { mockAddTodoParams } from '@/tests/domain/mocks';

let todosCollection: Collection;
let accountCollection: Collection;

const mockAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Sergio',
    email: 'sergio@gmail.com',
    password: '123asdqwe!@#',
  });
  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        accessToken,
      },
    },
  );
  return accessToken;
};

describe('Todos Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  beforeEach(async () => {
    todosCollection = await MongoHelper.getCollection('todos');
    await todosCollection.deleteMany({});
    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  describe('Todos', () => {
    describe('add', () => {
      test('Should return 403 without accessToken', async () => {
        await request(app)
          .post('/api/todos')
          .send({
            title: faker.random.words(3),
            dueDate: new Date(),
          })
          .expect(403);
      });

      test('Should return 201 on add', async () => {
        const accessToken = await mockAccessToken();

        await request(app)
          .post('/api/todos')
          .set('x-access-token', accessToken)
          .send({
            title: faker.random.words(3),
            dueDate: new Date(),
          })
          .expect(201);
      });
    });

    describe('delete', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams();
        const result = await todosCollection.insertOne(todo);

        await request(app).delete(`/api/todos/${result.insertedId}`).send().expect(403);
      });

      test('Should return 204 on delete', async () => {
        const accessToken = await mockAccessToken();
        const todo = mockAddTodoParams();
        const result = await todosCollection.insertOne(todo);

        await request(app)
          .delete(`/api/todos/${result.insertedId}`)
          .set('x-access-token', accessToken)
          .send()
          .expect(204);
      });
    });

    describe('delete completed', () => {
      test('Should return 403 without accessToken', async () => {
        await request(app).delete(`/api/todos-completed`).send().expect(403);
      });

      test('Should return 204 on delete', async () => {
        const accessToken = await mockAccessToken();
        const todo = mockAddTodoParams();
        await todosCollection.insertOne(todo);

        await request(app)
          .delete(`/api/todos-completed`)
          .set('x-access-token', accessToken)
          .send()
          .expect(204);
      });
    });

    describe('update', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams();
        const result = await todosCollection.insertOne(todo);

        await request(app)
          .put('/api/todos')
          .send({
            id: result.ops[0]._id,
            completed: true,
            title: 'new title',
          })
          .expect(403);
      });

      test('Should return 200 on update', async () => {
        const accessToken = await mockAccessToken();
        const todo = mockAddTodoParams();
        const result = await todosCollection.insertOne(todo);

        await request(app)
          .put('/api/todos')
          .set('x-access-token', accessToken)
          .send({
            id: result.ops[0]._id,
            completed: true,
            title: 'new title',
          })
          .expect(200);
      });

      test('Should return 404 when not exixting todo', async () => {
        const accessToken = await mockAccessToken();

        await request(app)
          .put('/api/todos')
          .set('x-access-token', accessToken)
          .send({
            id: '60480d9b39bab84bf07eac95',
            completed: true,
            title: 'new title',
          })
          .expect(404);
      });
    });

    describe('loadAll', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams();

        await todosCollection.insertOne(todo);
        await request(app).get('/api/todos').send().expect(403);
      });

      test('Should return 200 on load', async () => {
        const accessToken = await mockAccessToken();
        const todo = mockAddTodoParams();

        await todosCollection.insertOne(todo);
        await request(app).get('/api/todos').set('x-access-token', accessToken).send().expect(200);
      });
    });

    describe('load', () => {
      test('Should return 403 without accessToken', async () => {
        const todo = mockAddTodoParams();
        const result = await todosCollection.insertOne(todo);

        await request(app).get(`/api/todos/${result.insertedId}`).send().expect(403);
      });

      test('Should return 200 on load', async () => {
        const accessToken = await mockAccessToken();
        const todo = mockAddTodoParams();
        const result = await todosCollection.insertOne(todo);

        await request(app)
          .get(`/api/todos/${result.insertedId}`)
          .set('x-access-token', accessToken)
          .send()
          .expect(200);
      });
    });
  });
});
