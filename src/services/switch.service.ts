import { define, singleton } from '@injex/core'
import type { Client } from '../client/client.js'
import type { Identification } from '../client/schemas.js'

@define()
@singleton()
export class SwitchService {
  protected client!: Client

  protected identificationMap: Map<string, Identification> | undefined

  protected async getIdentificationMap (): Promise<Map<string, Identification>> {
    if (this.identificationMap === undefined) {
      this.identificationMap = new Map()

      for (const { identification } of await this.client.getInterfaces()) {
        this.identificationMap.set(identification.id, identification)
      }
    }

    return this.identificationMap
  }

  public async reset (id: string): Promise<void> {
    const identification = (await this.getIdentificationMap()).get(id)

    if (identification === undefined) {
      throw this.createInvalidInterfaceError(id)
    }

    await this.client.reset(identification)
  }

  protected createInvalidInterfaceError (_id: string): Error {
    return new Error('Invalid interface!')
  }
}
