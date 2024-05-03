import axios, { AxiosResponse } from 'axios'
import { MediaType, SortType, MediaCardType } from '@/types/media'

const apiBase = process.env.NEXT_PUBLIC_API_URL

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
  const res = await axios.get<GetMediaResponse>(
    `${apiBase}/api/medialist?type=${type}&sorttype=${sortType}`
  )
  return res
}

export const apiGetTrendingMediaList = async (): Promise<
  AxiosResponse<GetTrendingResponse>
> => {
  const res = await axios.get<GetTrendingResponse>(
    `${apiBase}/api/trendinglist`
  )
  return res
}
