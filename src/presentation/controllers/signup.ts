import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { MissingParamError } from '@/presentation/errors/missingParamError'
import { badRequest } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controllers'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { InvalidEmailError } from '@/presentation/errors/invalidEmailError'
import { ServerError } from '@/presentation/errors/serverError'

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
      console.log(e)
      return {
        statusCode: 500, body: new ServerError()
      }
    }
  }
}
