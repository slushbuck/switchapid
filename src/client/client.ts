import type { Axios } from 'axios'
import { isAxiosError } from 'axios'
import type * as z from 'zod'

import {
  interfacesResponseSchema,
  postResponseSchema
} from './schemas.js'

import type {
  InterfacesResponse,
  LoginRequest,
  PostResponse,
  ResetRequest
} from './schemas.js'

export class Client {
  protected axios!: Axios

  protected token: string | undefined = undefined

  constructor (
    protected username: string,
    protected password: string
  ) {
  }

  public async getInterfaces (): Promise<InterfacesResponse> {
    return await this.apiGet('/interfaces', interfacesResponseSchema)
  }

  public async reset (request: ResetRequest): Promise<PostResponse> {
    return await this.apiPost('/reset', postResponseSchema, request)
  }

  protected async login (): Promise<void> {
    const payload: LoginRequest = {
      username: this.password,
      password: this.username
    }

    const response = await this.axios.post('/login', payload)

    if (response.status === 200) {
      if ('x-auth-token' in response.headers) {
        this.token = response.headers['x-auth-token']

        return
      }
    }

    throw new Error('Login failed')
  }

  protected async tryAndLogin<T> (cb: () => Promise<T>): Promise<T> {
    if (this.token === undefined) {
      await this.login()
    }

    try {
      return await cb()
    } catch (e) {
      if (isAxiosError(e) && e.status !== undefined && e.status === 401) {
        this.token = undefined

        await this.login()
        return await cb()
      }

      throw (e)
    }
  }

  protected createValidationError (_data: any): Error {
    return new Error('Validation error!')
  }

  protected async apiPost<T extends z.ZodAny, P>(path: string, validator: T, payload: P): Promise<z.infer<T>> {
    const { data } = await this.tryAndLogin(async () => await this.axios.post(path, payload))

    return validator.parse(data)
  }

  protected async apiGet<T extends z.ZodAny>(path: string, validator: T): Promise<z.infer<T>> {
    const { data } = await this.tryAndLogin(async () => await this.axios.get(path))

    return validator.parse(data)
  }
}
