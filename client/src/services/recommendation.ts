import axios, { AxiosResponse } from 'axios'
import { MediaType, SortType, MediaCardType } from '@/types/media'
import { apiBase } from '@/lib/exports'

import axiosRetry from 'axios-retry'
import { UserRecommendation } from '@/types/user'

axiosRetry(axios, {
  retries: 3,
  retryDelay: retryCount => {
    return retryCount * 500
  },
  retryCondition: error => {
    if (!error.response) {
      return false
    }
    const statusCode = error.response.status
    return statusCode >= 500 && statusCode < 600
  }
})

export const apiGetSimilarContent = async (
  type: MediaType,
  id: number
): Promise<AxiosResponse<MediaCardType[]>> => {
  try {
    const res = await axios.get<MediaCardType[]>(
      `${apiBase}/recommend/similar/${type}/${id}`
    )
    return res
  } catch (error) {
    console.error('Error al obtener la lista de contenido similar: ', error)
    throw error
  }
}

export const apiGetRecommendedContent = async (
  userId: string
): Promise<AxiosResponse<UserRecommendation[]>> => {
  try {
    const res = await axios.get<UserRecommendation[]>(
      `${apiBase}/recommend/recommendations/${userId}`
    )
    return res
  } catch (error) {
    console.error('Error al obtener la lista de contenido recomendado: ', error)
    throw error
  }
}
