import { MongoHelper as sut } from '../helper/mongo-helper'

beforeAll(async () => {
  await sut.connect(process.env.MONGO_URL)
})

afterAll(async () => {
  await sut.disconnect()
})

describe('Mongo Helper', () => {
  test('Should re-conect if mongo connection is lost', async () => {
    let accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()

    await sut.disconnect()
    accountCollection = await sut.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
