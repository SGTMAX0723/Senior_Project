'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import ImageContainerDashboard from '../../../components/ImageContainerDashboard';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import { IoIosSearch } from "react-icons/io";
import { BsViewList } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";

export default function Dashboard() {
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

        useEffect(() => {
            fetchProjects();
        }, []);

        let first_name = user.name.split(' ')[0];

        return (
            <main className='min-h-screen'>
                <div className='min-h-screen ml-48 pt-36 pb-16
                                flex justify-center items-center
                                bg-primary'>

                    <div className='grid grid-cols-1 w-full mx-16 my-auto h-screen-64'>
                        <div className='px-2 h-36 max-w-7xl justify-self-center w-full'>
                            <div className='flex flex-row justify-between'>
                                <h1 className='text-4xl text-secondary font-semi-bold'>Welcome back, <span className="font-light italic">{first_name}</span></h1>
                                <div className="flex relative text-zinc-500 w-2/5 xl:visible lg:visible md:invisible min-[0px]:invisible max-sm:invisible">
                                    <div className='flex space-x-3 pr-3'>
                                        <button className='bg-zinc-50 hover:bg-[#A3A0FB] hover:text-zinc-50 rounded-md h-9 w-9 self-center'><BsListUl className='mx-auto my-auto' size={26}/></button>
                                        <button className='bg-zinc-50 hover:bg-[#A3A0FB] hover:text-zinc-50 rounded-md h-9 w-9 self-center'><BsViewList className='mx-auto my-auto' size={26}/></button>
                                    </div>
                                    <input
                                        className="bg-zinc-50 h-10 w-full pl-4 rounded-md text-sm font-light focus:outline-none tracking-[.07em]"
                                        type="search"
                                        name="search"
                                        placeholder="Search projects"
                                    />
                                    <button type="submit" className="flex absolute inset-y-0 right-0 mx-1 justify-center items-center h-full">
                                        <IoIosSearch className='pr-2' size={28} />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 justify-items-center gap-10 '>
                            {projects.map(({ project_name, project_img, project_url, updated, id }:any, index:number) => {
                                function loadProject() {
                                    router.push(project_url);
                                }
                                return (
                                    <div className='rounded-md w-full max-w-7xl'>
                                        <ImageContainerDashboard key={index} project_name={project_name} project_img={project_img} updated={updated} load_project={loadProject} id={id}/>
                                    </div>
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
