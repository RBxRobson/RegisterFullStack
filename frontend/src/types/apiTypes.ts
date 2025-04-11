export interface UserRegisterPayload {
  username: string
  email: string
  password: string
  full_name?: string
}

export interface UserResponse {
  id: number
  username: string
  email: string
  full_name?: string
  is_active: boolean
  created_at: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}
