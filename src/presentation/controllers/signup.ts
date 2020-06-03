import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controllers'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { MissingParamError, InvalidEmailError } from '@/presentation/errors'
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
    } catch (e) {
      console.error(e)
      return serverError()
    }
  }
}
