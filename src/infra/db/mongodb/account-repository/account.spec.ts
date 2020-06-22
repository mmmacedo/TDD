import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-repository/account'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  const makeSut = (): AccountMongoRepository => {
    return new AccountMongoRepository()
  }

  test('Should return an Account on success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_mail@email.com',
      password: 'valid_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@email.com')
    expect(account.password).toBe('valid_password')
  })
})
