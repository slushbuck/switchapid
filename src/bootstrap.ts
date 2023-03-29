import { bootstrap, IBootstrap, inject } from '@injex/core'
import { Server } from './server.js'

@bootstrap()
export class Bootstrap implements IBootstrap {
  @inject() private readonly server!: Server

  public async run (): Promise<void> {
    const url = await this.server.listen()

    console.log(url)
  }

  public didCatch (e: Error): void {
    console.error(e)
  }
}
