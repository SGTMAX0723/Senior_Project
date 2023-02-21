// going to be the page that shows all the connections, both followere and following
'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

export default function Connections() {
    // Re-renders the component after the first render
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        // This forces a rerender, so the page is rendered
        // the second time but not the first
        setHydrated(true);
    }, []);
    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();

    if (isLoggedIn) {
        return (
            <main>
                <div className='xl:h-screen lg:h-full md:h-full sm:h-max pt-16 ml-48
                                flex
                                bg-primary'>
    
                         <div className="container container m-auto flex flex-wrap flex-col md:flex-row items-center justify-center"> 
        

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Alan Lopez</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Alan@utrgv.edu <br></br> Github: Alan3832</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Alan Lopez</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Alan@utrgv.edu <br></br> Github: Alan3832</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Ethan V</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Ethan.V@utrgv.edu <br></br> Github: Ethan_man</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Gabe</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Gabe@utrgv.edu <br></br> Github: GABE_SGT</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Max Million</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: MAX@utrgv.edu <br></br> Github: MAX_SGT</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Alan Lopez</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Alan@utrgv.edu <br></br> Github: Alan3832</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Alan Lopez</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Alan@utrgv.edu <br></br> Github: Alan3832</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Ethan V</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Ethan.V@utrgv.edu <br></br> Github: Ethan_man</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Gabe</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: Gabe@utrgv.edu <br></br> Github: GABE_SGT</p>
                        

                    </div>


                </div>

                <div className="w-2/3 lg:w-1/2 p-2 ">
                    <div className="flex flex-col lg:flex-row rounded h-auto lg:h-32 border bg-white justify-between leading-normal">

                        <img className="h-16 w-16 rounded-full place-self-center lg:ml-4 " 
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="https://cdn140.picsart.com/364832977021201.png"/>
                        <div className="text-black font-bold text-l mb-2 leading-tight place-self-center">Max Million</div>
                        <p className="text-grey-darker place-self-center lg:mr-3 ">Email: MAX@utrgv.edu <br></br> Github: MAX_SGT</p>
                        

                    </div>


                    </div>

                </div>
            </div>
                <NavBarLogged />
                <SideBar />
            </main>
        )
    } else {
        router.push('/login')
    }
}