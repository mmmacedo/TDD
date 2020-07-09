import app from '@/main/config/app'
import request from 'supertest'

describe('Content-Type Middleware', () => {
  test('Should default return content-type as Json', async () => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
