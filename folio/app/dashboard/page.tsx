import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import ImageContainer from '../../components/ImageContainer';

export default function Dashboard() {
    return (
        <main>
            <div className='h-screen pt-16
                            flex
                            bg-primary'>

                <div className='flex w-full grid grid-flow-col grid-rows-2
                                 gap-16
                                justify-center items-center'>

                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                    <ImageContainer />
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    )
}
