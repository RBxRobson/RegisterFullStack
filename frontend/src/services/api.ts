import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { LoginPayload, TokenResponse, UserRegisterPayload, UserResponse } from '../types/apiTypes'

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<UserResponse, UserRegisterPayload>({
      query: (user) => ({
        url: '/register',
        method: 'POST',
        body: user,
      }),
    }),
    loginUser: builder.mutation<TokenResponse, LoginPayload>({
      query: ({ username, password }) => {
        const formData = new URLSearchParams()
        formData.append('username', username)
        formData.append('password', password)
        return {
          url: '/login',
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      },
    }),
  }),
})

export default api

export const { useRegisterUserMutation, useLoginUserMutation } = api
