'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import TemplateContainer from '../../components/TemplateContainer';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

export default function Templates() {

    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    const user: any = pb.authStore.model;

    if (isLoggedIn) {
        type MyRecord = Record<string, number>;
        const [projects, setProjects] = useState([] as MyRecord[]);

        const fetchProjects = async () => {
            let filters = 'created >= "2022-01-01 00:00:00"';
            try {
                const resultList = await pb.collection('templates').getList(1, 50, {
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
                    <div className='grid grid-cols-1 gap-4
                                    md:grid-cols-2 
                                    lg:grid-cols-3 
                                    xl:grid-cols-4 
                                    justify-items-center'>
                            {projects.map(({template_name, template_img, id}: any, index:number) => {
                                return (
                            <TemplateContainer text={template_name} img={template_img} id={id}/>
                            )})}
                        {/* <div>
                            <TemplateContainer text={<p className='pl-1'>Template 2</p>} image={"https://images.pexels.com/photos/161559/background-bitter-breakfast-bright-161559.jpeg?auto=compress&cs=tinysrgb&w=1600"}/>
                        </div>
                        <div>
                            <TemplateContainer text={<p className='pl-1'>Template 3</p>} image={"https://images.pexels.com/photos/35629/bing-cherries-ripe-red-fruit.jpg?auto=compress&cs=tinysrgb&w=1600"}/>
                        </div>
                        <div>
                            <TemplateContainer text={<p className='pl-1'>Template 4</p>} image={"https://images.pexels.com/photos/1313267/pexels-photo-1313267.jpeg?auto=compress&cs=tinysrgb&w=1600"}/>
                        </div> */}
                    </div>
                </div>
            </div>
                <NavBarLogged />
                <SideBar />
            </main>
        )
    } else {
        console.log('Not logged in');
        router.push('/login');
    }
}
