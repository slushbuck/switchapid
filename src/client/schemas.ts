import * as z from 'zod'

export const identificationSchema = z.object({
  id: z.string(),
  mac: z.string(),
  name: z.string(),
  type: z.string()
})
export type Identification = z.infer<typeof identificationSchema>

export const interfaceSchema = z.object({
  identification: identificationSchema
})
export type Interface = z.infer<typeof interfaceSchema>

export const interfacesResponseSchema = z.array(interfaceSchema)
export type InterfacesResponse = z.infer<typeof interfacesResponseSchema>

export const resetRequestSchema = identificationSchema
export type ResetRequest = z.infer<typeof resetRequestSchema>

export const loginRequestSchema = z.object({
  username: z.string(),
  password: z.string()
})
export type LoginRequest = z.infer<typeof loginRequestSchema>

export const postResponseSchema = z.object({
  statusCode: z.number().int(),
  error: z.number().int(),
  detail: z.string(),
  message: z.string()
})
export type PostResponse = z.infer<typeof postResponseSchema>
