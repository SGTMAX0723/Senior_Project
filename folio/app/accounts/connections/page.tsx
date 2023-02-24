// going to be the page that shows all the connections, both followere and following
'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import ConnectionCards from '../../../components/ConnectionsCard';

export default function Connections() {
    // Re-renders the component after the first render
    // const [hydrated, setHydrated] = useState(false);
    // useEffect(() => {
    //     // This forces a rerender, so the page is rendered
    //     // the second time but not the first
    //     setHydrated(true);
    // }, []);
    // if (!hydrated) {
    //     // Returns null on first render, so the client and server match
    //     return null;
    // }

    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    const user: any = pb.authStore.model; 


    if (isLoggedIn) {
        type MyRecord = Record<string, number>;
        const [connections, setConnections] = useState([] as MyRecord[]);


        const fetchConnections = async () =>{
            let expandFollowers = 'follows = "' + user.id + '"';
            try{
                const records = await pb.collection('connections').getList(1, 100000000, /* batch size */ {
                    sort: '-created',
                    expand: expandFollowers
                    
                });
                setConnections(records.items);
            }catch(error){
                console.error(error);
            }
        };

        useEffect(() => {
            fetchConnections();
        }, []);

        return (
            <main>
                <div className='xl:h-screen lg:h-full md:h-full sm:h-max pt-16 ml-48
                                flex
                                bg-primary'>
    
                <div className="container m-auto flex flex-wrap flex-col md:flex-row items-center justify-center"> 
        
                <div className="grid grid-cols-1 gap-16">
                    {connections.map(({ id, avatar }: any, index:number) => {
                        return(
                            <ConnectionCards key={index} avatar={avatar} id={id} />
                        );
                    })}
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