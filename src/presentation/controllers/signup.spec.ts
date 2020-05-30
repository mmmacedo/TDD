// sut = System Under Test
import { SignUpController } from './signup'

describe('SignUp Controller', () => {
  test('Should return an error if no name is provided', () => {
    const sut = new SignUpController()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_passoword',
        confirmPassword: 'any_passoword'
      }
    }
    const httpResponse = sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
  })
})
