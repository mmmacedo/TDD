import bcrypt from 'bcrypt'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<String> {
    return new Promise<String>(resolve => resolve('mocked_hash'))
  }
}))

describe('Bcrypt adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hasn when success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const result = await sut.encrypt('any_value')

    expect(result).toBe('mocked_hash')
  })
})
