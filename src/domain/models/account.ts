import { DefaultModel } from '../../domain/models/default-model'

export interface AccountModel extends DefaultModel{
  id: string
  name: string
  email: string
  password: string
}
