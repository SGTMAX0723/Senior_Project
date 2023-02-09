import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import TemplateContainer from '../../components/TemplateContainer';

export default function Templates() {
    return (
        <main>
            <div className='xl:h-screen lg:h-full md:h-full sm:h-max pt-16 ml-48
                            flex
                            bg-primary'>

            <div className='container mx-auto my-auto'>
                <div className='grid grid-cols-1 gap-4
                                md:grid-cols-2 
                                lg:grid-cols-3 
                                xl:grid-cols-4 
                                justify-items-center'>
                    <div>
                        <TemplateContainer />
                    </div>
                    <div>
                        <TemplateContainer />
                    </div>
                    <div>
                        <TemplateContainer />
                    </div>
                    <div>
                        <TemplateContainer />
                    </div>
                </div>
            </div>
        </div>
            <NavBarLogged />
            <SideBar />
        </main>
    )
}
