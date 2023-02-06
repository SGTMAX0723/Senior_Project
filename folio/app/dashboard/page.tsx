import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import ImageContainer from '../../components/ImageContainer';

export default function Dashboard() {
    return (
        <main>
            <div className='xl:h-screen lg:h-full md:h-full sm:h-max pt-16 ml-48
                            flex
                            bg-primary'>

                <div className='container mx-auto my-auto'>
                    <div className='grid grid-cols-1 gap-16
                                    md:grid-cols-2 
                                    lg:grid-cols-2 
                                    xl:grid-cols-3 
                                    justify-items-center'>
                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                    </div>
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    )
}
