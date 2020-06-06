import { badRequest, serverError } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from '@/presentation/controllers/signup/signup-protocols'
import { MissingParamError, InvalidEmailError, InvalidPasswordConfirmationError } from '@/presentation/errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, confirmPassword, name } = httpRequest.body

      if (!this.emailValidator.isValid(email)) {
        return badRequest(new InvalidEmailError('email'))
      }

      if (password !== confirmPassword) {
        return badRequest(new InvalidPasswordConfirmationError())
      }

      const account = this.addAccount.add({
        name,
        email,
        password
      })

      return {
        statusCode: 200,
        body: account
      }
    } catch (e) {
      console.error(e)
      return serverError()
    }
  }
}
