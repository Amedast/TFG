import { getImagePath } from '@/lib/functions'
import { apiGetPersonDetails } from '@/services/media'
import Image from 'next/image'
import ImageCarousel from '../../components/ImageCarousel'
import MediaCarousel from '../../components/MediaCarousel'
import ErrorComponent from '@/components/error'

export const generateMetadata = async ({
  params
}: {
  params: { id: number }
}) => {
  const apiResponse = await apiGetPersonDetails(params.id)
  const person = apiResponse.data
  if (person.success == false) {
    return {
      title: 'ERROR'
    }
  }
  return {
    title: `${person.name}`
  }
}

export default async function MovieDetails ({
  params
}: {
  params: { id: number }
}) {
  const apiResponse = await apiGetPersonDetails(params.id)
  const person = apiResponse.data
  if (person.success == false) {
    return <ErrorComponent text='Error: Persona no encontrada' />
  }
  return (
    <div className='container mx-auto py-[10rem] w-full  gap-10  bg-neutral-800/10 rounded-sm'>
      <div className='flex gap-10'>
        <div className='w-[20%]'>
          <Image
            className='rounded-sm'
            src={getImagePath(false, person.profile_path)}
            alt={person.name}
            height={100}
            width={300}
          />
          <div className='border border-secondary mt-3 rounded-sm p-3 flex flex-col flex-1 gap-5'>
            <div>
              <p className='font-semibold w-full'>Página de IMDB </p>
              <div className='truncate'>
                <a
                  className='hover:text-primary transition duration-200'
                  href={'https://www.imdb.com/name/' + person.imdb_id}
                  target='_blank'
                >
                  {'https://www.imdb.com/name/' + person.imdb_id}
                </a>
              </div>
            </div>
            <div>
              <p className='font-semibold'>Fecha de nacimiento</p>
              <p>{person.birthday}</p>
            </div>
            <div>
              <p className='font-semibold'>Lugar de nacimiento</p>
              <p>{person.place_of_birth}</p>
            </div>
            {person.deathday && (
              <div>
                <p className='font-semibold'>Fecha de fallecimiento</p>
                <p>{person.deathday}</p>
              </div>
            )}
            <div>
              <p className='font-semibold'>Ocupación</p>
              <p>{person.known_for_department}</p>
            </div>
          </div>
        </div>
        <div className='w-[80%]'>
          <div className='w-[80%]'>
            <h1 className='text-2xl sm:text-3xl md:text-5xl font-bold'>
              {person.name}
            </h1>
            {person.biography && (
              <div className='mt-5'>
                <p className='font-semibold'>Biografía</p>
                <p>{person.biography}</p>
              </div>
            )}
          </div>

          <div className='mt-10'>
            <h3 className='text-2xl font-semibold mb-3'>Galeria</h3>
            <div className=' mt-5 '>
              <ImageCarousel images={person.images.profiles} vertical={true} />
            </div>
          </div>
        </div>
      </div>
      <div>
        {(person.movie_credits.cast || person.movie_credits.crew) && (
          <div className='mt-10'>
            <h3 className='text-2xl font-semibold mb-3'>
              Películas donde ha participado
            </h3>
            <div className=' mt-5 '>
              <MediaCarousel
                media={person.movie_credits.cast.concat(
                  person.movie_credits.crew
                )}
                type='movie'
              />
            </div>
          </div>
        )}
        {(person.tv_credits.cast || person.tv_credits.crew) && (
          <div className='mt-10'>
            <h3 className='text-2xl font-semibold mb-3'>
              Series donde ha participado
            </h3>
            <div className=' mt-5 '>
              <MediaCarousel
                media={person.tv_credits.cast.concat(person.tv_credits.crew)}
                type='tv'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
