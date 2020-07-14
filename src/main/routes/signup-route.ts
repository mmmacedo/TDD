import { Router } from 'express'
import { adaptRoute } from '../../main/adapters/express-route-adapter'
import { makeSignupController } from '../../main/factories/signup-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
}
