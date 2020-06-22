import { AddAccountRepository } from '@/data/protocols/add-account-repository'
import { AddAccountModel } from '@/domain/usecases/add-account'
import { AccountModel } from '@/domain/models/account'
import { MongoHelper } from '@/infra/db/mongodb/helper/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const newAccount = result.ops[0]
    const { _id, ...accountWithoutId } = newAccount
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
