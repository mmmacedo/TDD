import { EmailValidatorAdapter } from '@/utils/email-validator'

describe('EmailValidator Adapter/Wrapper', () => {
  test('Should return false ifvalidator return false', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalidEmail')
    expect(isValid).toBe(false)
  })
})
