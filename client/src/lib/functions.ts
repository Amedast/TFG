import { SortType, MediaType } from '@/types/media'

export const getImagePath = (originalSize?: boolean, path?: string) => {
  return path
    ? `https://image.tmdb.org/t/p/${originalSize ? 'original' : 'w500'}/${path}`
    : '/ImagePlaceholder.png'
}

export const getMediaType = (media_type: string) => {
  return media_type == 'tv' ? 'Series' : 'Películas'
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
