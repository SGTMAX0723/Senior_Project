import NavBar from '../components/NavBar';
import ImageContainer from '../components/ImageContainer';

export default function Home() {
  return (
    <main>
      <NavBar />
      <div className='h-screen pt-16
                      flex
                      bg-primary'>

          <div className='flex w-full grid grid-flow-col grid-rows-2
                          mx-4 gap-16
                          justify-center items-center'>

            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
            <ImageContainer />
          </div>
      </div>
    </main>
  )
}
