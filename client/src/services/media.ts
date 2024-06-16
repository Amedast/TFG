import axios, { AxiosResponse } from 'axios'
import {
  MediaType,
  SortType,
  MediaCardType,
  MovieDetailsType,
  TVShowDetailsType,
  PersonDetailsType,
  SearchContentCall,
  DiscoverContentCall
} from '@/types/media'
import { apiBase } from '@/lib/exports'

import axiosRetry from 'axios-retry'

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

type GetMediaResponse = {
  results: MediaCardType[]
  page: number
  total_pages: number
  total_results: number
}

type GetTrendingResponse = {
  movies: GetMediaResponse
  tvShows: GetMediaResponse
}

export const apiGetMediaList = async (
  type: MediaType,
  sortType: SortType
): Promise<AxiosResponse<GetMediaResponse>> => {
  try {
    const res = await axios.get<GetMediaResponse>(
      `${apiBase}/api/medialist?type=${type}&sorttype=${sortType}`
    )
    return res
  } catch (error) {
    console.error('Error al obtener la lista de medios:', error)
    throw error
  }
}

export const apiGetTrendingMediaList = async (): Promise<
  AxiosResponse<GetTrendingResponse>
> => {
  try {
    const res = await axios.get<GetTrendingResponse>(
      `${apiBase}/api/trendinglist`
    )
    return res
  } catch (error) {
    console.error('Error al obtener la lista de medios en tendencia:', error)
    throw error
  }
}

export const apiGetMovieDetails = async (
  id: number
): Promise<AxiosResponse<MovieDetailsType>> => {
  try {
    const res = await axios.get<MovieDetailsType>(
      `${apiBase}/api/mediadetails?id=${id}&type=movie`
    )
    return res
  } catch (error) {
    console.error('Error al obtener los detalles de la pelicula: ', error)
    throw error
  }
}

export const apiGetTVShowDetails = async (
  id: number
): Promise<AxiosResponse<TVShowDetailsType>> => {
  try {
    const res = await axios.get<TVShowDetailsType>(
      `${apiBase}/api/mediadetails?id=${id}&type=tv`
    )
    return res
  } catch (error) {
    console.error('Error al obtener los detalles de la serie:', error)
    throw error
  }
}

export const apiGetPersonDetails = async (
  id: number
): Promise<AxiosResponse<PersonDetailsType>> => {
  try {
    const res = await axios.get<PersonDetailsType>(
      `${apiBase}/api/mediadetails?id=${id}&type=person`
    )
    return res
  } catch (error) {
    console.error('Error al obtener los detalles de la persona:', error)
    throw error
  }
}

export const apiGetSearchContent = (
  text: string,
  page: number
): Promise<AxiosResponse<SearchContentCall>> => {
  try {
    const res = axios.get<SearchContentCall>(
      `${apiBase}/api/search?text=${text}&page=${page}`
    )
    return res
  } catch (error) {
    console.error('Error al hacer la busqueda del contenido: ', error)
    throw error
  }
}

export const apiGetDiscoverContent = (
  type: MediaType,
  page?: number,
  genre?: string,
  sort_by?: string,
  sort_order?: string,
  min_rating?: number,
  max_rating?: number,
  year?: string
): Promise<AxiosResponse<DiscoverContentCall>> => {
  try {
    let pageParam = page ? page : 1
    let queryParams = `?type=${type}&page=${pageParam}`

    if (genre) {
      queryParams += `&with_genres=${encodeURIComponent(genre)}`
    }

    if (sort_by) {
      queryParams += `&sort_by=${encodeURIComponent(sort_by)}.${
        sort_order || 'desc'
      }`

      if (sort_by == 'vote_average') queryParams += '&vote_count=200'
    }

    if (min_rating !== undefined) {
      queryParams += `&min_rating=${encodeURIComponent(min_rating)}`
    }

    if (max_rating !== undefined) {
      queryParams += `&max_rating=${encodeURIComponent(max_rating)}`
    }

    if (year) {
      queryParams += `&year=${encodeURIComponent(year)}`
    }

    const res = axios.get<DiscoverContentCall>(
      `${apiBase}/api/discover${queryParams}`
    )
    return res
  } catch (error) {
    console.error('Error al hacer la busqueda del conteniddod: ', error)
    throw error
  }
}
