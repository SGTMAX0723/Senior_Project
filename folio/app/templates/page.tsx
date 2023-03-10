'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import TemplateContainer from '../../components/TemplateContainer';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

export default function Templates() {
    type MyRecord = Record<string, number>;
    const [templates, setTemplates] = useState([] as MyRecord[]);
    const [projects, setProjects] = useState([] as MyRecord[]);
    const router = useRouter();
    const isLoggedIn = pb.authStore.isValid;
    const user:any = pb.authStore.model;

    if (isLoggedIn) {
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

        const fetchProjects = async () => {
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
            fetchProjects();
        }, []);

        const topicList = [
            { name: 'Software Development', value: 'software' },
            { name: 'Data Science', value: 'data_science' },
            { name: 'Web Development', value: 'web_dev' },
            { name: 'AI', value: 'ai' },
            { name: 'Machine Learning', value: 'machine_learning' },
            { name: 'Cybersecurity', value: 'cybersecurity' },
            { name: 'Product Management', value: 'product_mgmt' },
            { name: 'Finance', value: 'finance' },
            { name: 'Marketing', value: 'marketing' },
            { name: 'Healthcare', value: 'design' },
            { name: 'Business', value: 'business' },
            { name: 'Other', value: 'other' },
        ];        

        const [checkedList, setCheckedList] = useState<boolean[]>(new Array(topicList.length).fill(false));

        // create a new project, initial pull from templates json, onsave and onload pull from projects json
        return (
            <main className='min-h-screen text-center sm:text-left'>
                <div className='xl:h-screen lg:h-full md:h-full sm:h-max min-h-screen pt-16 ml-48 flex bg-primary items-center'>
                    <div className='grid grid-cols-3 h-full w-full bg-zinc-50'>
                        <div className='px-6 pt-12 col-span-1'>
                            <h1 className='text-3xl font-bold text-zinc-900 ml-6 pb-1'>Your portfolio, your way.</h1>
                            <p className='text-lg text-zinc-900 ml-6'>Choose a template to get started</p>
                            <p className='text-xs text-zinc-500 ml-6 py-4'>OR</p>
                            <p className='text-lg text-zinc-900 ml-6 pb-6'>Filter by topic.</p>
                            <div className='container'>
                                <ul className='overflow-y-auto grid overflow-auto h-96 px-4'>
                                    {topicList.map(({ name, value }: any, index: number) => {
                                        return (
                                            <li
                                                key={index}
                                                className='text-md text-zinc-900 py-2 px-4 rounded-full text-center bg-zinc-100 inline-block mb-4 mr-auto cursor-pointer transition-colors duration-200 hover:bg-zinc-200'
                                                style={{
                                                    backgroundColor: checkedList[index] ? '#A3A0FB' : '',
                                                    color: checkedList[index] ? 'white' : '',
                                                }}
                                                onClick={() => {
                                                    const newCheckedList = [...checkedList];
                                                    newCheckedList[index] = !newCheckedList[index];
                                                    setCheckedList(newCheckedList);
                                                }}
                                            >
                                                {name}
                                                <input type="checkbox" checked={checkedList[index]} className='hidden' />
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className='col-span-2 justify-self-end w-full h-auto bg-primary rounded-l-xl my-6 drop-shadow-lg overflow-auto'>
                            <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 h-full w-full justify-items-center items-center px-4'>
                                {templates.map(({ template_name, template_img, id }: any, index: number) => {
                                    return (
                                        <TemplateContainer key={index} template_name={template_name} template_img={template_img} id={id} text={<p className="text-sm text-gray-600 mt-2">Template - Category</p>} alt_img={"flex w-full h-full bg-gradient-to-r from-[#A3A0FB] to-[#E53F71] justify-center items-center"} />
                                    );
                                })}
                                <TemplateContainer template_name={<p>Blank Project</p>} create_proj={createProject} text={<p className="text-sm text-gray-600 mt-2">A clean slate</p>} alt_img={"flex w-full h-full bg-gradient-to-r from-zinc-800 to-zinc-600 justify-center items-center"} />
                            </div>
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