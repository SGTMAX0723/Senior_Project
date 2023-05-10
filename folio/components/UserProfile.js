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

    const [following, setFollowing] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchProjects();
    }, [isPublic, fetchProjects, fetchUsers]);
    
    const listView = () => {
        return(
            <div className='grid grid-cols-1 w-full max-w-7xl px-4 py-4 justify-items-center gap-10'>
                {projects.map(({ project_name, project_Image, project_url, updated, visibility, favorites, id, template }, index) => {
                    function loadProject() {
                        router.push(project_url);
                    }
                    if (isPublic && visibility === true) {
                        return (
                            <div key={id} className='rounded-md w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                                {
                                    user.id === userId ?
                                    <ImageContainerDashboard key={index} project_name={project_name} project_Image={project_Image} updated={updated} load_project={loadProject} id={id} template={template} />
                                    :
                                    <ImageContainerHome key={index} project_name={project_name} project_Image={project_Image} updated={updated} favorites={favorites} id={id} template={template}/>
                                }
                            </div>
                        );
                    } else if (!isPublic && visibility === false) {
                        return (
                            <div key={id} className='rounded-md w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                                {
                                    user.id === userId ?
                                    <ImageContainerDashboard key={index} project_name={project_name} project_Image={project_Image} updated={updated} load_project={loadProject} id={id} template={template}/>
                                    :
                                    <ImageContainerHome key={index} project_name={project_name} project_Image={project_Image} updated={updated} favorites={favorites} id={id} template={template}/>
                                }
                            </div>
                        );
                    }
                })}
            </div>
        );
    };

    const fetchFollowing = async () => {
        let expandFollowers = 'follows = "' + user.id + '"';
        try {
            const records = await pb.collection('connections').getList(1, 100, /* batch size */ {
                sort: '-created',
                filter: expandFollowers
            });
            setFollowing(records.items);
        } catch(error) {
            console.error(error);
        }
    };

    const [refresh, setRefresh] = useState(false);
    useEffect(() => {
        fetchFollowing();
    }, [refresh, fetchFollowing]);

    const handleProfilePictureChange = () => {
        // Implement the functionality to change the profile picture
    };

    const [loading, setLoading] = useState(false);
    return (
        <main className='min-h-screen'>
            <div className='h-screen ml-48 pt-28 pb-12 px-12
                            flex justify-center items-center
                            bg-primary'>
                <div className='grid grid-cols-3 gap-x-6 w-full max-w-7xl h-full'>
                    <div className='w-full h-full drop-shadow-lg rounded-2xl bg-zinc-50'>
                        <div className='grid grid-rows-2 gap-2 w-full h-full'>
                            {users.map(({ name, username, avatar, banner, id }, index) => {
                                function unfollow() {
                                    setLoading(true);
                                    following.map(async ({ follows, followed, id }) => {
                                        console.log(follows, followed, id);
                                        if (follows === user.id && followed === userId) {
                                            await pb.collection('connections').delete(id);
                                            setRefresh(!refresh);
                                        }
                                    });
                                    setLoading(false);
                                }
                                
                                async function follow() {
                                    setLoading(true);
                                    await pb.collection('connections').create({
                                        'follows': user.id,
                                        'followed': id,
                                    });
                                    setRefresh(!refresh);
                                    setLoading(false);
                                }
                                return (
                                    <div key={index} className='flex w-full h-full items-center justify-center'>
                                        <div className='h-40 w-full self-start z-0 overflow-hidden'>
                                            {
                                                banner ?
                                                <img className='rounded-t-2xl' src={`https://folio-database.fly.dev/api/files/_pb_users_auth_/${id}/${banner}`} alt='banner'/>
                                                :
                                                <div className='w-full h-full rounded-t-2xl bg-zinc-400' />
                                            }
                                        </div>
                                        <div className='absolute flex flex-col w-full h-full items-center justify-center gap-y-8'>
                                            <div className='flex h-36 w-36 z-10 pt-10'>
                                                <img
                                                    className='flex h-36 w-36 rounded-full'
                                                    src={avatar ? `https://folio-database.fly.dev/api/files/_pb_users_auth_/${id}/${avatar}`: '/Default_PFP.jpg'}
                                                    alt='profile picture'
                                                />
                                                <button className='absolute hover:bg-zinc-900 hover:opacity-50 text-transparent hover:text-zinc-200 flex h-36 w-36 rounded-full items-center justify-center'>
                                                    <HiCamera size={36} />
                                                </button>
                                            </div>
                                            {
                                                user.id === userId ?
                                                <div className='flex flex-col items-center justify-center pt-8'>
                                                    <h1 className='text-2xl text-secondary font-regular'>{name}</h1>
                                                    <h1 className='text-sm text-zinc-700 font-regular'>@{username}</h1>
                                                </div>
                                                :
                                                <div className='grid grid-cols-3 w-full px-10 items-center'>
                                                    <div className='flex flex-col col-span-2 pt-8'>
                                                        <h1 className='text-2xl text-secondary font-regular'>{name}</h1>
                                                        <h1 className='text-sm text-zinc-700 font-regular'>@{username}</h1>
                                                    </div>
                                                    <button onClick={() => {following.find(({ followed }) => followed === id) ? unfollow() : follow()}} className={`flex items-center justify-center w-22 mt-9 ml-6 ${following.find(({ followed }) => followed === id) ? 'bg-[#A3A0FB] hover:bg-[#b8b5ff]' : 'bg-zinc-900 hover:bg-zinc-700'} text-sm text-zinc-50 h-8 rounded-full`} disabled={loading}>
                                                        {
                                                            loading ? <p>Processing...</p> :
                                                            following.find(({ followed }) => followed === id) ?
                                                            <p>Unfollow</p>
                                                            :
                                                            <p>Follow</p>
                                                        }
                                                    </button>
                                                </div>
                                            }
                                        </div>
                                    </div>
                            )})}
                            <div className='w-full h-full z-10'>
                                {users.map(({ email, githubLink, bio }, index) => (
                                    <div key={index}>
                                        <div className='flex flex-col w-full h-full items-start px-10 text-zinc-500 text-md'>
                                            <p>Email: <a href={`mailto:${email}`} style={{ display: 'inline-block' }}>{email}</a></p>
                                            <p>Github: <a href={`${githubLink}`} style={{ display: 'inline-block' }}>{githubLink}</a></p>
                                        </div>
                                        <br></br>
                                        <div className='flex flex-col text-zinc-500 text-md px-10'>
                                            <p className='font-bold pb-3'>Bio</p>
                                            <p className='text-zinc-500 text-md'>{bio}</p>
                                            
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
                                        <div key={index} className='grid grid-cols-2'>
                                            <h1 className='text-3xl text-secondary'><span className="font-semi-bold italic">Your</span> <span className='font-light'>Projects</span></h1>
                                            <button className='text-xs font-semi-bold text-zinc-500 justify-self-end' onClick={handleClick}>{isPublic ? 'PUBLIC' : 'PRIVATE'}</button>
                                        </div>
                                    )
                                } else {
                                    return (
                                        <h1 key={index} className='text-3xl text-secondary'><span className="font-semi-bold italic">{first_name}&apos;s</span> <span className='font-light'>Projects</span></h1>
                                    )
                                }
                            })}
                        </div>
                        {listView()}
                    </div>
                </div>
            </div>
            <NavBarLogged />
            <SideBar />
        </main>
    );
}

export default UserProfile;