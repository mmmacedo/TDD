import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with corect password', async () => {
    class EncrypterStub {
      async encrypt (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_value'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const validPassword = 'valid_password'
    const accountData = {
      name: 'valid_name',
      email: 'valid@mail.com',
      password: validPassword
    }
    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith(validPassword)
  })
})
