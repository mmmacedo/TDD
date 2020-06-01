import { HttpRequest, HttpResponse } from '@/presentation/protocol/http'
import { MissingParamError } from '@/presentation/errors/missingParamError'
import { badRequest } from '@/presentation/helpers/http-helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      return badRequest(new MissingParamError('email'))
    }
  }
}
