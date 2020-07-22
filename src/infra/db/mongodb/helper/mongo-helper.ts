import { Collection, MongoClient } from 'mongodb'
import { DefaultModel } from '../../../../domain/models/default-model'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as String,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map: (collection: any): DefaultModel => {
    const { _id, ...accountWithoutId } = collection
    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
