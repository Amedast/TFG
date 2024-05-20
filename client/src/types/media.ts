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
  first_air_date?: string
}

export type MediaType = 'movie' | 'tv'

export type SortType =
  | 'popular'
  | 'top_rated'
  | 'upcoming'
  | 'trending'
  | 'on_the_air'

export type MovieDetailsType = {
  adult: boolean
  backdrop_path: string
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  overview: string
  poster_path: string
  release_date: string
  first_air_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  title: string
  vote_average: number
  videos: Videos
  credits: Credits
  recommendations: Recommendations
  similar: Similar
  'watch/providers': Providers
  images: Images
  success?: boolean
}

export type TVShowDetailsType = {
  adult: boolean
  backdrop_path: string
  episode_run_time: number[]
  first_air_date: string
  genres: Genre[]
  homepage: string
  id: number
  name: string
  number_of_episodes: number
  number_of_seasons: number
  overview: string
  poster_path: string
  seasons: Season[]
  spoken_languages: SpokenLanguage[]
  status: string
  vote_average: number
  videos: Videos
  credits: Credits
  recommendations: Recommendations
  similar: Similar
  'watch/providers': Providers
  images: Images
  success?: boolean
}

export type MediaDetailsType = {
  adult: boolean
  backdrop_path: string
  budget: number
  genres: Genre[]
  homepage: string
  id: number
  imdb_id: string
  overview: string
  poster_path: string
  release_date: string
  first_air_date: string
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  title: string
  vote_average: number
  videos: Videos
  credits: Credits
  recommendations: Recommendations
  similar: Similar
  'watch/providers'?: Providers
  images: Images
  episode_run_time: number[]
  name: string
  number_of_episodes: number
  number_of_seasons: number
  seasons: Season[]
}

export interface PersonDetailsType {
  biography: string
  birthday: string
  deathday: any
  gender: number
  homepage: any
  id: number
  imdb_id: string
  known_for_department: string
  name: string
  place_of_birth: string
  profile_path: string
  credits: Credits
  images: Images
  movie_credits: {
    cast: MediaCardType[]
    crew: MediaCardType[]
  }
  tv_credits: {
    cast: MediaCardType[]
    crew: MediaCardType[]
  }
  success?: boolean
}

export interface Genre {
  id: number
  name: string
}

export interface SpokenLanguage {
  iso_639_1: string
  name: string
}

export interface Videos {
  results: VideoType[]
}

export interface VideoType {
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}

export interface Credits {
  cast: Person[]
  crew: Person[]
}

export interface Person {
  adult: boolean
  gender: number
  id: number
  name: string
  profile_path: string
  character?: string
  credit_id: string
  department: string
}

export interface Recommendations {
  results: Media[]
}

export interface Similar {
  results: Media[]
}

export interface Media {
  backdrop_path: string
  id: number
  overview: string
  poster_path: string
  media_type: string
  title: string
  original_language: string
  genre_ids: number[]
  release_date: string
  vote_average: number
}

export type Providers = {
  results: {
    ES: {
      link: string
      rent?: Provider[]
      buy?: Provider[]
      flatrate?: Provider[]
    }
  }
}

export type Provider = {
  logo_path: string
  provider_id: number
  provider_name: string
}

export interface Images {
  backdrops: ImageType[]
  logos: ImageType[]
  posters: ImageType[]
  profiles: ImageType[]
}

export interface ImageType {
  height: number
  file_path: string
  width: number
}

export interface Season {
  air_date?: string
  episode_count: number
  id: number
  name: string
  overview: string
  poster_path: string
  season_number: number
  vote_average: number
}

export interface SearchContentCall {
  page: number
  results: ContentResult[]
  total_pages: number
  total_results: number
}

export interface ContentResult {
  id: number
  poster_path?: string
  profile_path?: string
  media_type: string
  title?: string
  release_date?: string
  vote_average?: number
  name?: string
  first_air_date?: string
  gender?: number
  known_for_department?: string
}

export interface DiscoverContentCall {
  page: number
  results: MediaCardType[]
  total_pages: number
  total_results: number
}
