import { define } from '@injex/core'
import {
  Field,
  ID,
  ObjectType
} from 'type-graphql'

export enum PoeState {
  V24,
  V48
}

@define()
@ObjectType()
export class Interface {
  @Field(_type => ID)
    id!: string

  @Field()
    name!: string

  @Field()
    mac!: string

  @Field()
    type!: string

  @Field(_type => PoeState)
    poe?: PoeState
}
