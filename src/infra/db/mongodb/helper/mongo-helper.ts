import { Collection, MongoClient } from 'mongodb'
import { DefaultModel } from '@/domain/models/default-model'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (collection: any): DefaultModel => {
    const { _id, ...accountWithoutId } = collection
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
