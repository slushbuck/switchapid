import { define, singleton } from '@injex/core'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'

import { Interface } from '../entities/interface.js'
import type { SwitchService } from '../services/switch.service.js'

@define()
@singleton()
@Resolver(_of => Interface)
export class InterfaceResolver {
  protected switchService!: SwitchService

  @Query(_returns => [Interface])
  async interfaces (): Promise<Interface[]> {
    return [
    ]
  }

  @Mutation(_returns => Interface)
  async reset (@Arg('id') id: string): Promise<{}> {
    await this.switchService.reset(id)

    return {}
  }
}
