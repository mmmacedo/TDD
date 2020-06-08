import { EmailValidatorAdapter } from '@/utils/email-validator'
import validator from 'validator'

jest.mock('validator', () => ({
  isEmail (): boolean {
    return true
  }
}))

describe('EmailValidator Adapter/Wrapper', () => {
  test('Should return false ifvalidator return false', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalidEmail@email.com')
    expect(isValid).toBe(false)
  })

  test('Should return false ifvalidator return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('validEmail@email.com')
    expect(isValid).toBe(true)
  })
})
