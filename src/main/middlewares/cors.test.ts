import app from '../../main/config/app'
import request from 'supertest'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })

    await request(app)
      .get('/test_cors')
      .expect('access-allow-control-origin', '*')
      .expect('access-allow-control-methods', '*')
      .expect('access-allow-control-headers', '*')
  })
})
