export type CheckResponse = {
  value: boolean
  errors?: string[]
}

export type LoginResponse = {
  encodedToken: string
  error?: string
  message?: string
}

export type RegisterResponse = {
  error?: string
  message: string
}
