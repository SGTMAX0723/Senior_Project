'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import ImageContainerDashboard from '../../../components/ImageContainerDashboard';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

export default function Dashboard() {

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
                            <ImageContainerDashboard />
                            <ImageContainerDashboard />
                            <ImageContainerDashboard />
                            <ImageContainerDashboard />
                            <ImageContainerDashboard />
                            <ImageContainerDashboard />
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
