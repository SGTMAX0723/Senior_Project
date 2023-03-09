'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import TemplateContainer from '../../components/TemplateContainer';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';
import Link from 'next/link';

export default function Templates() {
    const isLoggedIn = pb.authStore.isValid;
    const router = useRouter();
    const user:any = pb.authStore.model;

    if (isLoggedIn) {
        type MyRecord = Record<string, number>;
        const [templates, setTemplates] = useState([] as MyRecord[]);
        const [projects, setProjects] = useState([] as MyRecord[]);
        const [create, setCreate] = useState([] as MyRecord[]);

        const fetchTemplates = async () => {
            let filters = 'created >= "2022-01-01 00:00:00"';
            try {
                const templateList = await pb.collection('templates').getList(1, 50, {
                filter: filters
                });
                setTemplates(templateList.items);
            } catch (error) {
                console.error(error);
            }
        };

        const fetchtProjects = async () => {
            let filters = 'created >= "2022-01-01 00:00:00" && user_projects = "' + user.id + '"';
            try {
                const projectList = await pb.collection('projects').getList(1, 50, {
                    filter: filters,
                    sort: '-created',
                });
                setProjects(projectList.items);
            } catch (error) {
                console.error(error);
            }
        };

        const createProject = async () => {
            try {
                const data = {
                    "user_projects": user.id,
                    "project_name": `Project ${projects.length + 1}`,
                };
                const project = await pb.collection('projects').create(data);
                const projectId = project.id;
                const projectUrl = `http://localhost:3000/page-editor/${user.username}/${projectId}`;
                await pb.collection('projects').update(project.id, {'project_url': projectUrl});
                setProjects([...projects, project]);
                router.push(projectUrl)
            }
            catch (error) {
                alert(error);
            }
        };

        useEffect(() => {
            fetchTemplates();
        }, []);

        useEffect(() => {
            fetchtProjects();
        }, []);

        return (
            <main>
                <div className='xl:h-screen lg:h-full md:h-full sm:h-max min-h-screen pt-16 ml-48
                                flex
                                bg-primary'>
    
                <div className='container mx-16 my-auto'>
                    <div className='grid grid-cols-1 gap-4
                                    md:grid-cols-2 
                                    lg:grid-cols-3 
                                    xl:grid-cols-4 
                                    justify-items-center'>
                    <button onClick={createProject}>
                        <TemplateContainer text={<p className='pl-1'>Blank Project</p>} />
                    </button>
                    </div>
                    <div className='h-8' />
                    <div className='grid grid-cols-1 gap-4
                                    md:grid-cols-2 
                                    lg:grid-cols-3 
                                    xl:grid-cols-4 
                                    justify-items-center'>
                                {templates.map(({template_name, template_img, id}: any, index:number) => {
                                    return (
                                <TemplateContainer key={index} text={template_name} img={template_img} id={id}/>
                                )})}
                    </div>
                </div>
            </div>
                <NavBarLogged />
                <SideBar />
            </main>
        )
    } else {
        router.push('/login');
    }
}
