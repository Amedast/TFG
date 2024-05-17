import { SortType, MediaType, Genre, MediaDetailsType } from '@/types/media'
import { ListItem } from '@/types/mediaList'

export const getImagePath = (
  originalSize?: boolean,
  path?: string,
  specificSize?: number
) => {
  return path
    ? `https://image.tmdb.org/t/p/${
        originalSize
          ? 'original'
          : specificSize
          ? 'w' + specificSize.toString()
          : 'w500'
      }/${path}`
    : '/ImagePlaceholder.png'
}

export const getMediaType = (media_type: string, singular?: boolean) => {
  let result = media_type == 'tv' ? 'Series' : 'Películas'
  if (singular) result = result.substring(0, result.length - 1)
  return result
}

export const getUrlByType = (media_type: string) => {
  return media_type == 'tv' ? '/series/' : '/movies/'
}

export const mixMoviesAndTVShows = (array1: any[], array2: any[]) => {
  const result = []
  const maxLength = Math.max(array1.length, array2.length)

  for (let i = 0; i < maxLength; i++) {
    if (i < array1.length) {
      result.push({ value: array1[i], index: i + 1 })
    }
    if (i < array2.length) {
      result.push({ value: array2[i], index: i + 1 })
    }
  }

  return result
}

export const getCarouselTitle = (
  media_type: MediaType,
  sort_type: SortType
) => {
  return {
    media_type: media_type == 'tv' ? 'Series' : 'Películas',
    sort_type:
      sort_type == 'popular'
        ? 'Populares'
        : sort_type == 'upcoming'
        ? 'Próximamente'
        : sort_type == 'top_rated'
        ? 'Mejor Valoradas'
        : sort_type == 'on_the_air'
        ? 'En Emisión'
        : 'En Tendecias'
  }
}
export const parseTime = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  const hoursText = `${hours} h`
  const minutesText = `${remainingMinutes} m`

  if (hours > 0 && remainingMinutes > 0) {
    return `${hoursText} ${minutesText}`
  } else if (hours > 0) {
    return hoursText
  } else {
    return minutesText
  }
}

export const parseTypeToText = (type: number) => {
  switch (type) {
    case 0:
      return 'Planeado'
    case 1:
      return 'En Curso'
    case 2:
      return 'Completado'
  }
}

export const getGenresArray = (genres: Genre[]) => {
  let result: string[] = []
  genres.forEach(gen => {
    result.push(gen.name)
  })
}

export const parseDate = (date: Date) => {
  const javaData = new Date(date.toString())

  return (
    javaData.getDate() +
    '-' +
    javaData.getMonth() +
    '-' +
    javaData.getFullYear()
  ).toString()
}

export const parseItemToMedia = (item: ListItem) => {
  let media: MediaDetailsType = {
    adult: false,
    backdrop_path: item.content.background,
    budget: 0,
    genres: item.content.genres,
    homepage: '',
    id: item.content.contentId,
    imdb_id: '',
    overview: '',
    poster_path: item.content.poster,
    release_date: '',
    first_air_date: '',
    revenue: 0,
    runtime: item.content.runtime,
    spoken_languages: [],
    status: '',
    title: item.content.name,
    vote_average: 0,
    videos: {
      results: []
    },
    credits: {
      crew: [],
      cast: []
    },
    recommendations: {
      results: []
    },
    similar: {
      results: []
    },
    images: {
      backdrops: [],
      logos: [],
      posters: [],
      profiles: []
    },
    episode_run_time: [item.content.runtime],
    name: item.content.name,
    number_of_episodes: item.content.episodes,
    number_of_seasons: 0,
    seasons: []
  }
  return media
}

export function getCookie (name: string): string | undefined {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift()
  }
  return undefined
}

export function deleteCookie (name: string): void {
  document.cookie = `${name}=; Max-Age=0; path=/; secure; samesite=strict`
}
