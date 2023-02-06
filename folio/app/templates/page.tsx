import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import ImageContainer from '../../components/ImageContainer';
import TemplateContainer from '../../components/TemplateContainer';

export default function Templates() {
    return (
        <main>
            <div className='xl:h-screen lg:h-full md:h-full sm:h-max pt-16 ml-48
                            flex
                            bg-primary'>

                <div className='container mx-auto my-auto'>
                    <div className='grid grid-cols-4 gap-4'>
                        <div> Template 1 </div>
                        <div> Template 2 </div>
                        <div> Template 3 </div>
                        <div> Template 4 </div>
                    {/* <div className='
                                    
                                    justify-items-center'> */}
                      <TemplateContainer />
                      <TemplateContainer />
                      <TemplateContainer />
                      <TemplateContainer />
                    </div>
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    )
}
