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
    } else {
        router.push('/login')
    }
}