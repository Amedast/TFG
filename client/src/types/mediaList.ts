import { Genre, MediaType } from './media'

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
    image: string
    mediaType: MediaType
    episodes: number
  }
  status: number
  rating?: number
  progress?: number
  startDate?: Date
  endDate?: Date
  notes?: string
  timeWatched: number
}
