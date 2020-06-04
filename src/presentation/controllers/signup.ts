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

      if (!this.emailValidator.isValid(httpRequest.body.email)) {
        return badRequest(new InvalidEmailError('email'))
      }

      if (httpRequest.body.password !== httpRequest.body.confirmPassword) {
        return badRequest(new InvalidPasswordConfirmationError())
      }
    } catch (e) {
      console.error(e)
      return serverError()
    }
  }
}
