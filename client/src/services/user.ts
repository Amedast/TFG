import axios, { AxiosResponse } from 'axios'
import { LoginResponse, CheckResponse, RegisterResponse } from '@/types/user'
import { apiBase } from '@/lib/exports'
import { getCookie } from '@/lib/functions'

// Login
export const apiLogin = (
  identifier: string,
  password: string
): Promise<AxiosResponse<LoginResponse>> => {
  return axios.post<LoginResponse>(`${apiBase}/auth/login`, {
    identifier,
    password
  })
}

// Register
export const apiRegister = (
  username: string,
  password: string,
  email: string
): Promise<AxiosResponse<RegisterResponse>> => {
  return axios.post<RegisterResponse>(`${apiBase}/auth/register`, {
    username,
    password,
    email
  })
}

// Check Email
export const apiCheckEmail = (
  email: string
): Promise<AxiosResponse<CheckResponse>> => {
  return axios.get<CheckResponse>(`${apiBase}/auth/checkemail/${email}`)
}

// Check Username
export const apiCheckUser = (
  username: string
): Promise<AxiosResponse<CheckResponse>> => {
  return axios.get<CheckResponse>(`${apiBase}/auth/checkuser/${username}`)
}

// Check Password
export const apiCheckPassword = (
  password: string
): Promise<AxiosResponse<CheckResponse>> => {
  return axios.get<CheckResponse>(`${apiBase}/auth/checkpassword/${password}`)
}

export const apiGetUserId = (): Promise<AxiosResponse<string>> => {
  const token = getCookie('token')

  return axios.get<string>(`${apiBase}/auth/getuserid/${token}`)
}
