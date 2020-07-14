import { badRequest, serverError, ok } from '../../../presentation/helpers/http-helper'
import { HttpRequest, HttpResponse, Controller, EmailValidator, AddAccount } from '../../../presentation/controllers/signup/signup-protocols'
import { MissingParamError, InvalidEmailError, InvalidPasswordConfirmationError } from '../../../presentation/errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor (emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredFields = ['name', 'email', 'password', 'confirmPassword']

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          console.error(`Missing Field: ${field}`)
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, confirmPassword, name } = httpRequest.body

      if (!this.emailValidator.isValid(email)) {
        console.error(`Invalid Email: ${email}`)
        return badRequest(new InvalidEmailError('email'))
      }

      if (password !== confirmPassword) {
        console.error('Invalid password confirmation')
        return badRequest(new InvalidPasswordConfirmationError())
      }

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      return ok(account)
    } catch (e) {
      console.error(e)
      return serverError()
    }
  }
}
