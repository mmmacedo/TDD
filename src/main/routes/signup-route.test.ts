import app from '@/main/config/app'
import request from 'supertest'

describe('Signup Routes', () => {
  test('Should return 200 on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Murilo',
        email: 'murilo.macedo@yahoo.com.br',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})
