import request from 'supertest'

import { app } from '@/main/config'

describe('NoCache Middleware', () => {
  test('Should set cache correctly', async () => {
    app.get('/test_no_cache', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_no_cache')
      .expect(
        'Cache-Control',
        'no-store, no-cache, must-revalidate, proxy-revalidate'
      )
      .expect('Expires', '0')
      .expect('Surrogate-Control', 'no-store')
  })
})
