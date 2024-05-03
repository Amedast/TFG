import MediaCarousel from '@/components/media/MediaCarousel'
import LandingBanner from '@/components/media/LandingBanner/LandingBanner'
import MediaContainer from '@/components/media/LandingMediaContainer/MediaContainer'
export default function Home () {
  return (
    <div>
      <div>
        <LandingBanner />
      </div>
      <div className='container mx-auto'>
        <div>
          <MediaCarousel type='movie' sortType='popular' />
          <MediaCarousel type='tv' sortType='popular' />
        </div>
        <div className='mt-[3rem] flex flex-wrap gap-y-5 justify-around'>
          <MediaContainer type='movie' sortTypes={['top_rated', 'upcoming']} />
          <MediaContainer type='tv' sortTypes={['top_rated', 'on_the_air']} />
        </div>
      </div>
    </div>
  )
}
