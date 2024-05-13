import dotenv from 'dotenv'
dotenv.config()

export const apiBase = process.env.NEXT_PUBLIC_API_URL as string
