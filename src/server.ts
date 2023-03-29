import { buildSchema } from 'type-graphql'
import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

import { define, singleton } from '@injex/core'

import { InterfaceResolver } from './resolvers/interface.resolver.js'

@define()
@singleton()
export class Server {
  protected apollo?: ApolloServer = undefined

  async listen (): Promise<string> {
    const server = await this.getApollo()

    const { url } = await startStandaloneServer(server)

    return url
  }

  protected async getApollo (): Promise<ApolloServer> {
    if (this.apollo === undefined) {
      const schema = await buildSchema({
        resolvers: [InterfaceResolver]
      })

      this.apollo = new ApolloServer({ schema })
    }

    return this.apollo
  }
}
