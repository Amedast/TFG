import { Genre, MediaType } from './media'

export type GetListResponse = {
  error?: string
  message: string
  mediaList: MediaListType
  currentPage: number
  totalPages: number
}

export type ListResponse = {
  error?: string
  message: string
}

export type CheckListResponse = {
  error?: string
  message: string
  exists: boolean
  content?: ListItem
}

export type ListItem = {
  content: {
    contentId: number
    name: string
    genres: Genre[]
    poster: string
    background: string
    mediaType: MediaType
    episodes: number
    runtime: number
  }
  status: number
  rating?: number
  progress?: number
  startDate?: Date
  endDate?: Date
  notes?: string
  timeWatched: number
}

type MediaData = {
  amount: number
  time: number
  rating: number
}

type Genres = {
  genre: { name: string; id: number }
  quantity: number
}

type ListData = {
  series: MediaData
  movies: MediaData
  genres: Genres[]
}

export type MediaListType = {
  data: ListData
  list: ListItem[]
}
