import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import TemplateContainer from '../../components/TemplateContainer';

export default function Templates() {
    return (
        <main>
            <div className='xl:h-screen lg:h-full md:h-full sm:h-max pt-16 ml-48
                            flex
                            bg-primary'>

    if (isLoggedIn) {
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
                            <TemplateContainer text={<p className='pl-1'>Template 1</p>} image={"https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg?auto=compress&cs=tinysrgb&w=1600"}/>
                        </div>
                        <div>
                            <TemplateContainer text={<p className='pl-1'>Template 2</p>} image={"https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1600"}/>
                        </div>
                        <div>
                            <TemplateContainer text={<p className='pl-1'>Template 3</p>} image={"https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=1600"}/>
                        </div>
                        <div>
                            <TemplateContainer text={<p className='pl-1'>Template 4</p>} image={"https://images.pexels.com/photos/51312/kiwi-fruit-vitamins-healthy-eating-51312.jpeg?auto=compress&cs=tinysrgb&w=1600"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <NavBarLogged />
            <SideBar />
        </main>
    )
}
