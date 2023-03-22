'use client'

import React, { useState, useEffect, useRef } from "react";
import NavBar from '../components/NavBar.js';
import ImageContainerHome from '../components/ImageContainerHome';
import { pb } from 'components/UserAuthentication';
import { useRouter } from 'next/navigation';

export default function Home() {
    type MyRecord = Record<string, number>;
    const [users, setUsers] = useState([] as MyRecord[]);
    const [projects, setProjects] = useState([] as MyRecord[]);
    const router = useRouter();

    const fetchUsers = async () => {
        let filters = 'created >= "2022-01-01 00:00:00"';
        try {
            const resultList = await pb.collection('users').getList(1, 1000000000, {
            filter: filters
            });
            setUsers(resultList.items);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchProjects = async () => {
        let filters = 'created >= "2022-01-01 00:00:00"';
        try {
            const resultList = await pb.collection('projects').getList(1, 1000000000, {
            filter: filters
            });
            setProjects(resultList.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        fetchProjects();
    }, []);

    const sortedProjects = projects.sort((a, b) => b.favorites - a.favorites);
    const topProjects = sortedProjects.slice(0, 10);

    return (
        <main className="min-h-screen text-center sm:text-left">
            <div id="svg-img" className="xl:h-screen lg:h-full md:h-full sm:h-max min-h-screen mt-16 flex items-center">
            <div className='grid grid-cols-1 w-full mx-16 my-auto h-screen-64'>
                    <div className='flex w-full mt-12 h-32 items-center justify-center'>
                        <h1 className="text-5xl text-center text-secondary font-bold">Build a Portfolio that will <p className="text-5xl text-[#A3A0FB] font-bold">get you hired.</p></h1>
                    </div>
                    <div className='flex w-full h-64 max-w-7xl justify-self-center items-center justify-center border-b-4 border-zinc-200'>
                        <p className="text-xl text-secondary font-semibold text-justify mb-8 mx-12">
                            Our website is designed to help individuals build a powerful and effective portfolio that will increase their chances of getting hired. In today's competitive job market, it's essential to have a portfolio that stands out from the rest. Our platform provides users with the necessary tools and resources to create a portfolio that showcases their unique skills and accomplishments. With our intuitive and user-friendly interface, creating a portfolio has never been easier. 
                        </p>
                    </div>
                    <div className='flex px-2 h-24 max-w-7xl justify-self-center justify-center items-center mt-8 mb-8 w-full'>
                        <h1 className='text-4xl text-center text-secondary font-semi-bold'>Featured User Projects</h1>
                    </div>
                    <div className='grid grid-cols-1 justify-items-center gap-10 mb-16'>
                        {topProjects.map(({ user_projects, project_name, project_img, updated, favorites, id }:any, index:number) => {
                            return (
                                <div className='rounded-md w-full max-w-7xl fade-in' style={{animationDelay: `${index * 0.15}s`}}>
                                    <ImageContainerHome
                                        key={index}
                                        user_name={users.map(({ id, name }: any, uKey: number) => {
                                            if (user_projects == id) {
                                                return <p key={uKey}>{name}</p>;
                                            }
                                        })}
                                        project_name={project_name}
                                        project_img={project_img}
                                        updated={updated}
                                        favorites={favorites}
                                        id={id}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <NavBar />
        </main>
    );
}
