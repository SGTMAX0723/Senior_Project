'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import  { pb } from './UserAuthentication';
import { HiCamera } from 'react-icons/hi';
import SideBar from './SideBar';
import NavBarLogged from './NavBarLogged.js';
import ImageContainerDashboard from './ImageContainerDashboard';
import ImageContainerHome from './ImageContainerHome';

const UserProfile = () => {
    const router = useRouter();
    const user = pb.authStore.model;

    const getUserIdFromUrl = () => {
        const path = window.location.pathname;
        const segments = path.split('/');
        const accountsIndex = segments.indexOf('accounts');
        const userId = segments[accountsIndex + 1];
        return userId;
    };
    const userId = getUserIdFromUrl();  

    const [users, setUsers] = useState([]);
    const [projects, setProjects] = useState([]);

    const fetchUsers = async () => {
        let filters = 'created >= "2022-01-01 00:00:00" && id = "' + userId + '"';
        try {
            const userList = await pb.collection('users').getList(1, 1000000, {
            filter: filters
            });
            setUsers(userList.items);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProjects = async () => {
        let filters = 'created >= "2022-01-01 00:00:00" && user_projects = "' + userId + '"';
        try {
            const resultList = await pb.collection('projects').getList(1, 50, {
            filter: filters
            });
            setProjects(resultList.items);
        } catch (error) {
            console.error(error);
        }
    };

    const [isPublic, setIsPublic] = useState(true);
    const handleClick = () => {
        setIsPublic(!isPublic);
    }

    useEffect(() => {
        fetchUsers();
        fetchProjects();
    }, [isPublic]);   
    
    const listView = () => {
        return(
            <div className='grid grid-cols-1 w-full max-w-7xl px-4 py-4 justify-items-center gap-10'>
                {projects.map(({ project_name, project_img, project_url, updated, visibility, favorites, id }, index) => {
                    function loadProject() {
                        router.push(project_url);
                    }
                    if (isPublic && visibility === true) {
                        return (
                            <div key={id} className='rounded-md w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                                {
                                    user.id === userId ?
                                    <ImageContainerDashboard key={index} project_name={project_name} project_img={project_img} updated={updated} load_project={loadProject} id={id}/>
                                    :
                                    <ImageContainerHome key={index} project_name={project_name} project_img={project_img} updated={updated} id={id}/>
                                }
                            </div>
                        );
                    } else if (!isPublic && visibility === false) {
                        return (
                            <div key={id} className='rounded-md w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                                {
                                    user.id === userId ?
                                    <ImageContainerDashboard key={index} project_name={project_name} project_img={project_img} updated={updated} load_project={loadProject} id={id}/>
                                    :
                                    <ImageContainerHome key={index} project_name={project_name} project_img={project_img} updated={updated} favorites={favorites} id={id}/>
                                }
                            </div>
                        );
                    }
                })}
            </div>
        );
    }

    const handleProfilePictureChange = () => {
        // Implement the functionality to change the profile picture
    };

    return (
        <main className='min-h-screen'>
            <div className='h-screen ml-48 pt-28 pb-12 px-12
                            flex justify-center items-center
                            bg-primary'>
                <div className='grid grid-cols-3 gap-x-6 w-full max-w-7xl h-full'>
                    <div className='w-full h-full drop-shadow-lg rounded-2xl bg-zinc-50'>
                        <div className='grid grid-rows-2 gap-2 w-full h-full'>
                            {users.map(({ name, avatar, banner, id }, index) => (
                            <div key={index} className='flex w-full h-full items-center justify-center'>
                                <div className='h-40 w-full self-start z-0 overflow-hidden'>
                                    {
                                        banner ?
                                        <img className='rounded-t-2xl' src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${id}/${banner}`} />
                                        :
                                        <div className='w-full h-full rounded-t-2xl bg-zinc-400' />
                                    }
                                </div>
                                <div className='absolute flex flex-col w-full h-full items-center justify-center gap-y-8'>
                                    <div className='flex h-36 w-36 z-10'>
                                        <img
                                            className='flex h-36 w-36 rounded-full'
                                            src={avatar ? `https://folio-database.fly.dev/api/files/_pb_users_auth_/${id}/${avatar}`: '/Default_PFP.jpg'}
                                        />
                                        <button
                                            onClick={handleProfilePictureChange}
                                            className='absolute flex items-center justify-center h-10 w-10 place-self-end ml-24 bg-[#A3A0FB] text-white rounded-full shadow-md hover:bg-[#b1aff1] hover:text-white focus:outline-none'
                                        >
                                            <HiCamera size={24} />
                                        </button>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <h1 className='text-2xl text-secondary font-regular'>{name}</h1>
                                        <h1 className='text-sm text-zinc-700 font-regular'>Student at UTRGV</h1>
                                    </div>
                                </div>
                            </div>
                            ))}
                            <div className='w-full h-full'>
                                {users.map(({ email, githubLink, bio }, index) => (
                                    <div key={index}>
                                        <div className='flex flex-col w-full h-full items-start px-10 text-zinc-500 text-md'>
                                            <p>Email: {email}</p>
                                            <p>Github: {githubLink}</p>
                                        </div>
                                        <br></br>
                                        <div className='flex flex-col text-zinc-500 text-md px-10'>
                                            <p className='font-bold pb-3'>Bio</p>
                                            {/* <p className='text-zinc-500 text-md pl-10'>{bio}</p> */}
                                            <p className='text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet explicabo illum optio ipsam incidunt sit neque alias voluptas, veniam tenetur perspiciatis ea distinctio dolore fugit magni quas voluptate, rem animi?</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-span-2 w-full h-full items-center justify-center drop-shadow-lg rounded-2xl bg-zinc-50 overflow-auto'>
                        <div className='grid grid-cols-1 w-full pt-8 px-8 pb-3'>
                            {users.map(({ name, id }, index) => {
                                let first_name = name.split(' ')[0];
                                if (id === user.id) {
                                    return (
                                        <div className='grid grid-cols-2'>
                                            <h1 key={index} className='text-3xl text-secondary'><span className="font-semi-bold italic">Your</span> <span className='font-light'>Projects</span></h1>
                                            <button className='text-xs font-semi-bold text-zinc-500 justify-self-end' onClick={handleClick}>{isPublic ? 'PUBLIC' : 'PRIVATE'}</button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <h1 key={index} className='text-3xl text-secondary'><span className="font-semi-bold italic">{first_name}'s</span> <span className='font-light'>Projects</span></h1>
                                    )
                                }
                            })}
                        </div>
                        {listView}
                    </div>
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    );
}

export default UserProfile;