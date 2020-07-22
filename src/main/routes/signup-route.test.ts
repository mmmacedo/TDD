import app from '../../main/config/app'
import request from 'supertest'
import { MongoHelper } from '../../infra/db/mongodb/helper/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({ name: 'valid_name', email: 'valid_email@mail.com', password: 'valid_passoword', confirmPassword: 'valid_passoword' })
      .expect(200)
  })
})
