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
    const router = useRouter();
    const isLoggedIn = pb.authStore.isValid;

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

        useEffect(() => {
            fetchTemplates();
        }, []);

        const topicList = [
            { name: 'Software Development', value: 'software' },
            { name: 'Product Management', value: 'product_mgmt' },
            { name: 'Finance', value: 'finance' },
            { name: 'Business', value: 'business' },
            { name: 'Healthcare', value: 'design' },
            { name: 'Other', value: 'other' },
        ];        

        const [checkedList, setCheckedList] = useState<boolean[]>(new Array(topicList.length).fill(false));

        // create a new project, initial pull from templates json, onsave and onload pull from projects json
        return (
            <main className='min-h-screen text-center sm:text-left'>
                <div className='xl:h-screen lg:h-full md:h-full sm:h-max min-h-screen pt-16 ml-48 flex bg-primary items-center'>
                    <div className='grid grid-cols-3 h-full w-full bg-zinc-50'>
                        <div className='px-6 pt-12 col-span-1 relative'>
                            <h1 className='text-3xl font-bold text-zinc-900 ml-6 pb-1'>Your portfolio, your way.</h1>
                            <p className='text-lg text-zinc-900 ml-6'>Choose a template to get started</p>
                            <p className='text-xs text-zinc-500 ml-6 py-4 max-lg:hidden'>OR</p>
                            <p className='text-lg text-zinc-900 ml-6 pb-6 max-lg:hidden'>Filter by topic.</p>
                        <div className='container max-lg:hidden relative'>
                        <ul className='overflow-y-auto grid overflow-auto h-[32rem] px-4'>
                            {topicList.map(({ name, value }: any, index: number) => {
                                return (
                                    <div>
                                        <div className='absolute inset-0 bg-black opacity-30 z-10 rounded-lg' />
                                        <li
                                            key={index}
                                            className='flex text-md text-zinc-900 py-2 px-4 h-10 rounded-full text-center bg-zinc-100 mb-4 mr-auto cursor-pointer transition-colors duration-200 hover:bg-zinc-200 fade-in relative'
                                            style={{
                                                backgroundColor: checkedList[index] ? '#A3A0FB' : '',
                                                color: checkedList[index] ? 'white' : '',
                                                animationDelay: `${index * 0.15}s`,
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
                                    </div>
                                );
                            })}
                        </ul>
                        <div className='absolute inset-0 flex w-full h-full justify-center items-center z-20'>
                            <h2 className='text-xl text-zinc-600 animate-pulse'>UNDER DEVELOPMENT</h2>
                        </div>
                    </div>
                    </div>
                        {/* <div className='px-6 pt-12 col-span-1'>
                            <h1 className='text-3xl font-bold text-zinc-900 ml-6 pb-1'>Your portfolio, your way.</h1>
                            <p className='text-lg text-zinc-900 ml-6'>Choose a template to get started</p>
                            <p className='text-xs text-zinc-500 ml-6 py-4 max-lg:hidden'>OR</p>
                            <p className='text-lg text-zinc-900 ml-6 pb-6 max-lg:hidden'>Filter by topic.</p>
                            <div className='container max-lg:hidden'>
                                <ul className='overflow-y-auto grid overflow-auto h-[32rem] px-4'>
                                    {topicList.map(({ name, value }: any, index: number) => {
                                        return (
                                            <li
                                                key={index}
                                                className='flex text-md text-zinc-900 py-2 px-4 h-10 rounded-full text-center bg-zinc-100 mb-4 mr-auto cursor-pointer transition-colors duration-200 hover:bg-zinc-200 fade-in'
                                                style={{
                                                    backgroundColor: checkedList[index] ? '#A3A0FB' : '',
                                                    color: checkedList[index] ? 'white' : '',
                                                    animationDelay: `${index * 0.15}s`,
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
                        </div> */}
                        <div className='col-span-2 justify-self-end w-full h-auto bg-primary rounded-l-xl my-6 drop-shadow-lg overflow-auto'>
                            <div className='grid grid-cols-1 py-8 min-[0px]:gap-y-10 sm:grid-cols-1 sm:gap-y-10 md:grid-cols-1 md:gap-y-10 lg:grid-cols-2 lg:gap-y-10 xl:grid-cols-3 h-full w-full justify-items-center items-center px-4'>
                                {templates.map(({ template_name, template_img, id }: any, index: number) => {
                                    return (
                                        <TemplateContainer key={index} templateId={id} template_name={template_name} template_img={template_img} id={id} text={<p className="text-sm text-gray-600 mt-2">Template - Category</p>} alt_img={"flex w-full h-full bg-gradient-to-r from-[#A3A0FB] to-[#E53F71] justify-center items-center"} />
                                    );
                                })}
                                <TemplateContainer template_name={<p>Blank Project</p>} text={<p className="text-sm text-gray-600 mt-2">A clean slate</p>} alt_img={"flex w-full h-full bg-gradient-to-r from-zinc-800 to-zinc-600 justify-center items-center"} />
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