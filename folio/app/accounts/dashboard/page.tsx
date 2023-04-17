'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import ImageContainerDashboard from '../../../components/ImageContainerDashboard';
import SearchBarDashboard from '../../../components/SearchBarDashboard';
import ProjectContainerGrid from '../../../components/ProjectContainerGrid';
import { useEffect, useState } from 'react';
import  { pb } from '../../../components/UserAuthentication';
import { BsViewList } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";

const Dashboard = () => {
    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    const user: any = pb.authStore.model;

    type MyRecord = Record<string, number>;
    const [projects, setProjects] = useState([] as MyRecord[]);

    const fetchProjects = async () => {
        const filters = user && user.id ? `created >= "2022-01-01 00:00:00" && user_projects = "${user.id}"` : '';
        try {
            const resultList = await pb.collection('projects').getList(1, 1000000, {
                filter: filters,
                sort: '-created',
            });
            setProjects(resultList.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            fetchProjects();
        } else {
            router.push('/login');
        }
    }, [isLoggedIn]); 

    const first_name = user && user.name ? user.name.split(' ')[0] : '';

    const [view, setView] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedView = localStorage.getItem('view');
            return savedView || 'list';
        }
        return 'list';
    });

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('view', view);
        }
    }, [view]);
    
    const listView = () => {
        return(
            <div className='grid grid-cols-1 justify-items-center gap-10'>
                {projects.map(({ project_name, project_img, project_url, updated, id, description, template }:any, index:number) => {
                    function loadProject() {
                        router.push(project_url);
                    }
                    return (
                        <div key={id + view} className='rounded-md w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                            <ImageContainerDashboard key={index} project_name={project_name} project_img={project_img} updated={updated} load_project={loadProject} id={id} description={description} template={template}/>
                        </div>
                    );
                })}
            </div>
        )
    }
    const gridView = () => {
        return(
            <div className='grid gap-10 min-[0px]:gap-y-10 sm:grid-cols-1 sm:gap-y-10 md:grid-cols-1 md:gap-y-10 lg:grid-cols-2 lg:gap-y-10 xl:grid-cols-3 max-w-7xl place-self-center items-center'>
                {projects.map(({ project_name, project_img, project_url, updated, id, description }:any, index:number) => {
                        function loadProject() {
                            router.push(project_url);
                        }
                        return (
                            <div key={id + view} className='w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                                <ProjectContainerGrid key={index} project_name={project_name} project_img={project_img} updated={updated} load_project={loadProject} id={id} description={description}/>
                            </div>
                        );
                    })}
            </div>
        )
    }

    if (!isLoggedIn) {
        return null;
    }

    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
        setHydrated(true);
    }, []);
    if (!hydrated) {
        return null;
    }

    return (
        <main className='min-h-screen'>
            <div className='min-h-screen ml-48 pt-36 pb-16
                            flex justify-center items-start
                            bg-primary'>

                <div className='grid grid-cols-1 w-full mx-16 h-screen-64'>
                    <div className='px-2 h-36 max-w-7xl justify-self-center w-full'>
                        <div className='flex flex-row justify-between'>
                            <h1 className='text-4xl text-secondary font-semi-bold'>Welcome back, <span className="font-light italic">{first_name}</span></h1>
                            <div className="flex relative text-zinc-500 w-2/5 xl:visible lg:visible md:invisible min-[0px]:invisible max-sm:invisible">
                                <div className='flex space-x-3 pr-3 items-start justify-center'>
                                    <button onClick={() => {setView('list')}} className='bg-zinc-50 hover:bg-[#A3A0FB] hover:text-zinc-50 rounded-md h-10 w-10'><BsListUl className='mx-auto my-auto' size={26}/></button>
                                    <button onClick={() => {setView('grid')}} className='bg-zinc-50 hover:bg-[#A3A0FB] hover:text-zinc-50 rounded-md h-10 w-10'><BsViewList className='mx-auto my-auto' size={26}/></button>
                                </div>
                                <SearchBarDashboard />
                            </div>
                        </div>
                    </div>
                    <div className='grid w-full h-full z-0'>
                        {view === 'list' ? listView() : gridView()}
                    </div>
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    );
}

export default Dashboard;
