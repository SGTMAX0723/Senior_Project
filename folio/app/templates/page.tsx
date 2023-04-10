'use client'

import { useRouter } from 'next/navigation';
import SideBar from '../../components/SideBar';
import NavBarLogged from '../../components/NavBarLogged.js';
import TemplateContainer from '../../components/TemplateContainer';
import { useEffect, useState } from 'react';
import  { pb } from 'components/UserAuthentication';

const Templates = () => {
    type MyRecord = Record<string, number>;
    const [templates, setTemplates] = useState([] as MyRecord[]);
    const router = useRouter();
    const isLoggedIn = pb.authStore.isValid;

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
        if (isLoggedIn) {
            fetchTemplates();
        } else {
            router.push('/login');
        }
    }, [isLoggedIn]);    

    // const topicList = [
    //     { name: 'Software Development', value: 'software' },
    //     { name: 'Product Management', value: 'product_mgmt' },
    //     { name: 'Finance', value: 'finance' },
    //     { name: 'Business', value: 'business' },
    //     { name: 'Healthcare', value: 'design' },
    //     { name: 'Other', value: 'other' },
    // ];        

    // const [checkedList, setCheckedList] = useState<boolean[]>(new Array(topicList.length).fill(false));

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

    // create a new project, initial pull from templates json, onsave and onload pull from projects json
    return (
        <main className='min-h-screen text-center sm:text-left'>
            <div className='xl:h-screen lg:h-full md:h-full sm:h-max min-h-screen pt-16 ml-48 flex bg-zinc-50 items-center justify-center'>
                <div className='col-span-2 justify-self-end w-5/6 self-center h-auto bg-primary rounded-xl my-6 drop-shadow-lg overflow-auto'>
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
            <NavBarLogged />
            <SideBar />
        </main>
    );  
}

export default Templates;