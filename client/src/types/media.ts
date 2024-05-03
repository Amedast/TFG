export type MediaCardType = {
  id: number
  poster_path: string
  title?: string
  name?: string
  vote_average: number
  backdrop_path: string
  release_date?: string
  overview: string
  media_type: string
}

export type MediaType = 'movie' | 'tv'

export type SortType =
  | 'popular'
  | 'top_rated'
  | 'upcoming'
  | 'trending'
  | 'on_the_air'
