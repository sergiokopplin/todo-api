import request from 'supertest';

import app from '@/main/config/app';

describe('ContentType Middleware', () => {
  test('Should enable json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send();
    });

    await request(app)
      .get('/test_content_type')
      .expect('content-type', 'application/json; charset=utf-8');
  });
});
