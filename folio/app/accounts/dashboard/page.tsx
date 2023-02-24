'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import ImageContainerDashboard from '../../../components/ImageContainerDashboard';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

export default function Dashboard() {
    // // Re-renders the component after the first render
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
        const [projects, setProjects] = useState([] as MyRecord[]);

        const fetchProjects = async () => {
            let filters = 'created >= "2022-01-01 00:00:00" && user_projects = "' + user.id + '"';
            try {
                const resultList = await pb.collection('projects').getList(1, 50, {
                filter: filters
                });
                setProjects(resultList.items);
            } catch (error) {
                console.error(error);
            }
        };

        console.log(projects);

        useEffect(() => {
            fetchProjects();
        }, []);

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
                            {projects.map(({ project_name, project_img, id }:any, index:number) => {
                                return (
                                    <ImageContainerDashboard key={index} project_name={project_name} project_img={project_img} id={id}/>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <NavBarLogged />
                <SideBar />
            </main>
        );
    } else {
        router.push('/login');
    }
}
