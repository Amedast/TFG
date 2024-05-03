import { apiGetTrendingMediaList } from '@/services/media'
import MediaCarouselBig from './MediaCarouselBig'
import { mixMoviesAndTVShows } from '@/lib/functions'

export default async function LandingBanner () {
  const apiResponse = await apiGetTrendingMediaList()
  const movies = apiResponse.data.movies.results
  const tvShows = apiResponse.data.tvShows.results

  const results = mixMoviesAndTVShows(movies, tvShows)
  return (
    <div>
      <div className='w-full flex justify-center '>
        <MediaCarouselBig items={results} />
      </div>
    </div>
  )
}
