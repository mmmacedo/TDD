import { Controller, HttpRequest, HttpResponse } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-decorator'

interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}

const makeSut = (): SutTypes => {
  const controllerStub = makeControllerStub()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut, controllerStub
  }
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Murilo'
        }
      }
      return new Promise(resolve => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}
describe('', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const httpRequest: HttpRequest = {
      body: {
        name: 'any_name',
        email: 'valid_email@valid.com',
        password: 'valid_password',
        passwordConfirmation: 'valid_password'
      }
    }
    await sut.handle(httpRequest)
    expect(handleSpy).toBeCalledWith(httpRequest)
  })
})
