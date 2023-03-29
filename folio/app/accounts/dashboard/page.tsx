'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../../components/SideBar';
import NavBarLogged from '../../../components/NavBarLogged.js';
import ImageContainerDashboard from '../../../components/ImageContainerDashboard';
import SearchBarDashboard from '../../../components/SearchBarDashboard';
import ProjectContainerGrid from '../../../components/ProjectContainerGrid';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import { BsViewList } from "react-icons/bs";
import { BsListUl } from "react-icons/bs";
import { AiFillMail } from "react-icons/ai";
import { SiGithub } from "react-icons/si"
import {ReactNode} from 'react';

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

        const [view, setView] = useState(() => {
            const savedView = localStorage.getItem('view');
            return savedView || 'list';
        });
        useEffect(() => {
            localStorage.setItem('view', view);
        }, [view]);
        
        const listView = () => {
            return(
                <div className='grid grid-cols-1 justify-items-center gap-10'>
                    {projects.map(({ project_name, project_img, project_url, updated, id }:any, index:number) => {
                        function loadProject() {
                            router.push(project_url);
                        }
                        return (
                            <div key={id + view} className='rounded-md w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                                <ImageContainerDashboard key={index} project_name={project_name} project_img={project_img} updated={updated} load_project={loadProject} id={id}/>
                            </div>
                        );
                    })}
                </div>
            )
        }
        const gridView = () => {
            return(
                <div className='grid gap-10 min-[0px]:gap-y-10 sm:grid-cols-1 sm:gap-y-10 md:grid-cols-1 md:gap-y-10 lg:grid-cols-2 lg:gap-y-10 xl:grid-cols-3 h-full w-full justify-items-center items-center'>
                    {projects.map(({ project_name, project_img, project_url, updated, id }:any, index:number) => {
                            function loadProject() {
                                router.push(project_url);
                            }
                            return (
                                <div key={id + view} className='w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.1}s`}}>
                                    <ProjectContainerGrid key={index} project_name={project_name} project_img={project_img} updated={updated} load_project={loadProject} id={id}/>
                                </div>
                            );
                        })}
                </div>
            )
        }

        return (
            <main className='min-h-screen'>
                <div className='min-h-screen ml-48 pt-[70px] pb-16
                                flex justify-center items-start
                                bg-primary'>

                    <div className='grid grid-cols-1 w-full mx-16 h-screen-64'>
                        <div className='px-2 h-36 max-w-7xl justify-self-center w-full '>
                            <div className='flex flex-row justify-between '>
                                <h1 className='text-4xl text-secondary font-semi-bold invisible md:visible'>Welcome back, <span className="font-light italic visible relative absolute -top-[30px] md:top-0 ">{first_name}</span></h1>
                                <div className="flex relative text-zinc-500 w-2/5 xl:visible lg:visible md:invisible min-[0px]:invisible max-sm:invisible">
                                    <div className='flex space-x-3 pr-3 items-start justify-center'>
                                        <button onClick={() => {setView('list')}} className='bg-zinc-50 hover:bg-[#A3A0FB] hover:text-zinc-50 rounded-md h-10 w-10'><BsListUl className='mx-auto my-auto' size={26}/></button>
                                        <button onClick={() => {setView('grid')}} className='bg-zinc-50 hover:bg-[#A3A0FB] hover:text-zinc-50 rounded-md h-10 w-10'><BsViewList className='mx-auto my-auto' size={26}/></button>
                                    </div>
                                    <SearchBarDashboard />
                                </div>
                            </div>


                            <div className='border grid grid-cols-1 md:grid-cols-2 w-full relative absolute -top-[30px] md:top-1'>

                                <img className="inline-block h-36 w-36 rounded-full ml-6" 
                                        src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}`} />
                                
                                <div className='invisible md:visible '>         
                                    <div className="text-black text-l mb-2 leading-tight place-self-center">This is my bio. These bios will have a character limit. The charcter limit will be the size of the text. Haven't reached the limit of anything until now 
                                    </div> 
                                     <div>
                                        <IconText icon={<AiFillMail size='20' />} text={<p className="text-grey-darker lg:mr-3 " >{user.email}</p>}/>
                                        <IconText icon={<SiGithub size='20' />} text={<a className="text-blue-500 mr-3" href={user.githubLink}>{user.githubLink} </a>}/>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className='w-full h-full z-0 relative absolute top-[120px] '>
                            {view === 'list' ? listView() : gridView()}
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

interface IconTextProps {
    icon: ReactNode;
    text: ReactNode;
  }
  
  
  const IconText = ({ icon, text }: IconTextProps) => (
    <div className='icon-text flex items-center space-x-2 ml-1 mr-3'>
      {icon}
      {text}
    </div>
  );
  