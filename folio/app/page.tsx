import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

export default function Home() {
  return (
    <main>
      <div className='h-screen
                      flex
                      bg-primary'>
        <SideBar />
      </div>
    </main>
  )
}
