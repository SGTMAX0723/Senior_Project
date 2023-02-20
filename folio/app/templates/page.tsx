'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import ImageContainer from '../../components/ImageContainerHome';
import TemplateContainer from '../../components/TemplateContainer';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

export default function Templates() {
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
    
                <div className='container mx-auto my-auto'>
                    <div className='grid grid-cols-1 gap-4
                                    md:grid-cols-2 
                                    lg:grid-cols-3 
                                    xl:grid-cols-4 
                                    justify-items-center'>
                        <div>
                            <div> Template 1 </div>
                            <TemplateContainer />
                        </div>
                        <div>
                            <div> Template 2 </div>
                            <TemplateContainer />
                        </div>
                        <div>
                            <div> Template 3 </div>
                            <TemplateContainer />
                        </div>
                        <div>
                            <div> Template 4 </div>
                            <TemplateContainer />
                        </div>
                    </div>
                </div>
            </div>
                <NavBarLogged />
                <SideBar />
            </main>
        )
    } else {
        console.log('Not logged in');
        router.push('/login');
    }
}
