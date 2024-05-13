import SortMediaCarousel from '@/components/media/SortMediaCarousel'
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
          <SortMediaCarousel type='movie' sortType='popular' />
          <SortMediaCarousel type='tv' sortType='popular' />
        </div>
        <div className='mt-[3rem] flex flex-wrap gap-y-5 justify-around'>
          <MediaContainer type='movie' sortTypes={['top_rated', 'upcoming']} />
          <MediaContainer type='tv' sortTypes={['top_rated', 'on_the_air']} />
        </div>
      </div>
    </div>
  )
}
