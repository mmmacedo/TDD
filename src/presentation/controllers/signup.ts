import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, EmailValidator } from '@/presentation/protocols'
import { MissingParamError, InvalidEmailError, InvalidPasswordConfirmationError } from '@/presentation/errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, confirmPassword } = httpRequest.body

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidEmailError('email'))
      }

      if (password !== confirmPassword) {
        return badRequest(new InvalidPasswordConfirmationError())
      }
    } catch (e) {
      console.error(e)
      return serverError()
    }
  }
}
