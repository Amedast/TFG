import MediaRating from '@/components/media/MediaRating'
import { getImagePath, parseTime } from '@/lib/functions'
import { apiGetMovieDetails } from '@/services/media'
import Image from 'next/image'
import ImageCarousel from '../../components/ImageCarousel'
import VideoCarousel from '../../components/VideoCarousel'
import CastCarousel from '../../components/CastCarousel'
import { Genre, MediaDetailsType, SpokenLanguage } from '@/types/media'
import AddToList from '../../components/AddToList'

export const generateMetadata = async ({
  params
}: {
  params: { id: number }
}) => {
  const apiResponse = await apiGetMovieDetails(params.id)
  const movie = apiResponse.data
  return {
    title: `${movie.title}`
  }
}

export default async function MovieDetails ({
  params
}: {
  params: { id: number }
}) {
  const apiResponse = await apiGetMovieDetails(params.id)
  const movie = apiResponse.data
  return (
    <div>
      <div className='relative flex justify-center'>
        <div className='w-full md:h-[40rem] overflow-hidden relative'>
          <div className='absolute w-full h-full lg:h-[40rem] items-center flex bg-gradient-to-t from-background to-transparent p-10 text-neutral-100 select-none'></div>
          <Image
            className='transition duration-200 '
            src={getImagePath(true, movie.backdrop_path)}
            width={2560}
            height={1440}
            alt={movie.title}
          />
        </div>
        <div className='container mx-auto absolute -bottom-[10.5rem] sm:-bottom-[5rem] md:-bottom-[7rem] lg:-bottom-[10rem] w-full flex flex-wrap xl:flex-nowrap gap-10 items-center justify-center xl:justify-start'>
          <div className='w-[40%] sm:w-[30%] xl:w-[20%] '>
            <Image
              className='transition duration-200 rounded-sm w-96'
              src={getImagePath(true, movie.poster_path)}
              width={300}
              height={700}
              alt={movie.title}
            />
          </div>

          <div className='w-full xl:w-[80%] text-center xl:text-start'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold'>
              {movie.title}
            </h1>
            <div className='flex items-center gap-5 text-lg sm:text-xl md:text-2xl font-semibold mt-1 justify-center xl:justify-start'>
              <p>{movie.release_date.split('-')[0]}</p>
              <p>{parseTime(movie.runtime)}</p>
              <p>
                <MediaRating rating={movie.vote_average} />
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='container mx-auto mt-10 w-full flex flex-wrap xl:flex-nowrap gap-10'>
        <div className=' w-full xl:w-[19.4%] '>
          <AddToList media={movie as MediaDetailsType} type='movie' />
          <div className='border border-secondary mt-3 rounded-sm p-3 flex flex-col flex-1 gap-5'>
            <div>
              <p className='font-semibold'>Valoración</p>
              <p>
                <MediaRating rating={movie.vote_average} />
              </p>
            </div>
            {movie.homepage != '' && (
              <div>
                <p className='font-semibold w-full'>Página web </p>
                <div className='truncate'>
                  <a
                    className='hover:text-primary transition duration-200'
                    href={movie.homepage}
                    target='_blank'
                  >
                    {movie.homepage}
                  </a>
                </div>
              </div>
            )}

            <div>
              <p className='font-semibold w-full'>Página de IMDB </p>
              <div className='truncate'>
                <a
                  className='hover:text-primary transition duration-200'
                  href={'https://www.imdb.com/title/' + movie.imdb_id}
                  target='_blank'
                >
                  {'https://www.imdb.com/title/' + movie.imdb_id}
                </a>
              </div>
            </div>
            <div>
              <p className='font-semibold'>Géneros</p>
              <div className='flex flex-wrap gap-2'>
                {movie.genres.map((genre: Genre, idx: number) => (
                  <div
                    key={genre.id}
                    className='border border-primary rounded-lg px-2 py-1 w-fit'
                  >
                    {genre.name}
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className='font-semibold'>Fecha de Lanzamiento </p>
              <p>{movie.release_date}</p>
            </div>
            <div>
              <p className='font-semibold'>Duración </p>
              <p>{parseTime(movie.runtime)}</p>
            </div>
            <div>
              <p className='font-semibold'>Presupuesto </p>
              <p>$ {movie.budget}</p>
            </div>
            <div>
              <p className='font-semibold'>Ganancia </p>
              <p>$ {movie.revenue}</p>
            </div>
            <div>
              <p className='font-semibold'>Idiomas</p>
              <div>
                {movie.spoken_languages.map(
                  (lang: SpokenLanguage, idx: number) => (
                    <>
                      <span>{lang.name}</span>
                      {''}
                      <span>
                        {idx != movie.spoken_languages.length - 1 && ', '}
                      </span>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='w-[80%] xl:mt-[5rem] flex flex-col flex-1 gap-10 '>
          {movie.overview && movie.overview != '' && (
            <div>
              <h3 className='text-2xl font-semibold mb-3'>Sinopsis</h3>
              <p>{movie.overview}</p>
            </div>
          )}

          {movie.images.backdrops && movie.images.backdrops.length > 0 && (
            <div>
              <h3 className='text-2xl font-semibold mb-3'>Galeria</h3>
              <div className=' mt-5 '>
                <ImageCarousel images={movie.images.backdrops} />
              </div>
            </div>
          )}

          {movie.videos.results && movie.videos.results.length > 0 && (
            <div>
              <h3 className='text-2xl font-semibold mb-3'>Vídeos</h3>
              <div className=' mt-5 '>
                <VideoCarousel videos={movie.videos.results} />
              </div>
            </div>
          )}

          <div>
            <h3 className='text-2xl font-semibold mb-3'>Reparto</h3>
            <div className=' mt-5 '>
              <CastCarousel
                cast={movie.credits.cast.concat(movie.credits.crew)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
