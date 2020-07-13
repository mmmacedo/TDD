import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'

export const makeSignupController = (): SignUpController => {
  const emailValidator = new EmailValidatorAdapter()
  const salt = 12
  const bCryper = new BcryptAdapter(salt)
  const accountMongoRepo = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bCryper, accountMongoRepo)
  const signUpController = new SignUpController(emailValidator, dbAddAccount)
  return signUpController
}
