// going to be the page that shows all the connections, both followere and following

import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
export default function Connections() {
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
                        <h1>Connections Page</h1>
                    </div>
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    )
}