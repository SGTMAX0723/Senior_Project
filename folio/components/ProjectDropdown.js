import { useState, useEffect } from "react";
import { pb } from "./UserAuthentication";

const ProjectDropdown = (props) => {
    async function deleteProject() {
        await pb.collection('projects').delete(props.id);
    }
    const [projects, setProjects] = useState([]);
    const fetchProjects = async () => {
        let filters = 'created >= "2022-01-01 00:00:00" && id = "' + props.id + '"';
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
    });
    const handleClick = async () => {
        const project = projects.find((p) => p.id === props.id);
        if (project) {
            const newVisibility = !project.visibility;
            await pb.collection('projects').update(props.id, { 'visibility': newVisibility });
        }
    };           
    return (
        <main className="h-screen">
            <div className="relative">
                <div className='z-10 absolute right-2 mt-2 whitespace-nowrap w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5'>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                        <button onClick={handleClick} className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                            {projects.map(({ visibility }, index) => {
                                if (visibility === true) {
                                    return (
                                        <div key={index}>
                                            <p>Make private</p>
                                        </div>
                                    );
                                } else {
                                    return (
                                        <div key={index}>
                                            <p>Make public</p>
                                        </div>
                                    );
                                }
                            })}
                        </button>
                        <button onClick={deleteProject} className="block px-4 py-3 text-sm text-red-600 hover:bg-gray-100" role="menuitem">
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProjectDropdown;

