// sut = System Under Test
import { SignUpController } from '../../../presentation/controllers/signup/signup'
import { MissingParamError, InvalidEmailError, InvalidPasswordConfirmationError } from '../../../presentation/errors'
import { EmailValidator, AccountModel, AddAccount, AddAccountModel } from '../../../presentation/controllers/signup/signup-protocols'

interface SutTypes {
  sut: SignUpController
  emailValidatorStub: EmailValidator
  addAccountStub: AddAccount
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

const makeEmailValidatorWithError = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      throw new Error()
    }
  }

  return new EmailValidatorStub()
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const addAccountStub = makeAddAccount()
  const sut = new SignUpController(emailValidatorStub, addAccountStub)
  return {
    sut, emailValidatorStub, addAccountStub
  }
}

const makeAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountModel): Promise<AccountModel> {
      const fakeAccount = {
        id: 'validId', name: 'valid Name', email: 'valid@email.com', password: 'valid_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }

  return new AddAccountStub()
}

describe('SignUp Controller', () => {
  test('Should return an error if no name is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com', password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('name'))
  })

  test('Should return an error if no email is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name', password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('email'))
  })

  test('Should return an error if no password is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name', email: 'any_email@mail.com', confirmPassword: 'any_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('password'))
  })

  test('Should return an error if no confirmPassword is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name', email: 'any_email@mail.com', password: 'any_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new MissingParamError('confirmPassword'))
  })

  test('Invalid email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name', email: 'any_email@mail.com', password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidEmailError('email'))
  })

  test('Should call EmailValidator with correct mail', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    const email = 'any_email@mail.com'
    const httpRequest = {
      body: {
        name: 'any_name', email: email, password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should return 500 if EmailValidator throws', async () => {
    const emailValidatorStub = makeEmailValidatorWithError()
    const sut = new SignUpController(emailValidatorStub, null)
    const httpRequest = {
      body: {
        name: 'any_name', email: 'any_email@mail.com', password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  // outra forma de fazer o teste, mocando a implementação
  test('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid').mockImplementation(() => {
      throw new Error()
    })
    const email = 'any_email@mail.com'
    const httpRequest = {
      body: {
        name: 'any_name', email: email, password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith(email)
  })

  test('Should return an error if password confirmation fail', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name', email: 'any_email@mail.com', password: 'any_passoword', confirmPassword: 'other_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(400)
    expect(httpResponse.body).toEqual(new InvalidPasswordConfirmationError())
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountStub } = makeSut()
    const isValidSpy = jest.spyOn(addAccountStub, 'add')

    const httpRequest = {
      body: {
        name: 'any_name', email: 'any_email@mail.com', password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    await sut.handle(httpRequest)
    expect(isValidSpy).toHaveBeenCalledWith({
      name: 'any_name', email: 'any_email@mail.com', password: 'any_passoword'
    })
  })

  test('Should return 500 if AddAccount throws', async () => {
    const { sut, addAccountStub } = makeSut()
    jest.spyOn(addAccountStub, 'add').mockImplementation(() => {
      throw new Error()
    })
    const httpRequest = {
      body: {
        name: 'any_name', email: 'any_email@mail.com', password: 'any_passoword', confirmPassword: 'any_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(500)
  })

  test('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'valid_name', email: 'valid_email@mail.com', password: 'valid_passoword', confirmPassword: 'valid_passoword'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse.statusCode).toBe(200)
    expect(httpResponse.body).toEqual({
      id: 'validId', name: 'valid Name', email: 'valid@email.com', password: 'valid_password'
    })
  })
})
