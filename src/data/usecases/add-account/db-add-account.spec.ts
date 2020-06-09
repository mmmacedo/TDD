import { DbAddAccount } from '@/data/usecases/add-account/db-add-account'
import { Encrypter } from '@/data/protocols/encrypter'

interface SutTypes {
  sut: DbAddAccount
  encrypterStub: Encrypter
}

const makeSut = (): SutTypes => {
  const encrypterStub = makeEncrypter()
  const sut = new DbAddAccount(encrypterStub)
  return {
    sut,
    encrypterStub
  }
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_value'))
    }
  }
  return new EncrypterStub()
}

describe('DbAddAccount Usecase', () => {
  test('Should call Encrypter with corect password', async () => {
    const { sut, encrypterStub } = makeSut()
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
