import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { pb } from './UserAuthentication';

const CreateForm = (props) => {
    const [projectName, setProjectName] = useState('');
    const [description, setDescription] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [projects, setProjects] = useState([]);
    const [templates, setTemplates] = useState([]);
    const router = useRouter();
    const user = pb.authStore.model;

    const handleProjectNameChange = (event) => {
        setProjectName(event.target.value);
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    }

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

    const fetchTemplates = async () => {
        let filters = 'created >= "2022-01-01 00:00:00"';
        try {
            const templateList = await pb.collection('templates').getList(1, 50, {
                filter: filters,
            });
            setTemplates(templateList.items);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchProjects();
        fetchTemplates();
    });

    async function handleSubmit(event) {
        event.preventDefault();
        inDb = false;
        projects.map((project) => {
            if (project.project_name === projectName) {
                setShowAlert(true);
                inDb = true;
            }
        });

        const selectedTemplate = templates.find(({ id }) => id === props.templateId);
        const templateJson = selectedTemplate ? selectedTemplate.template_json : {};

        if (!inDb) {
            const data = {
                'project_name': projectName === '' ? `Project ${projects.length + 1}` : projectName,
                'description': description,
                'user_projects': user.id,
                'page_contents': templateJson,
                'template': props.template_name
            };
            createProject(data);
        }
    }

    const createProject = async (data) => { 
        try {
            const project = await pb.collection('projects').create(data);
            const projectId = project.id;
            const projectUrl = `http://localhost:3000/page-editor/${user.username}/${projectId}`;
            await pb.collection('projects').update(project.id, {'project_url': projectUrl});
            setProjects([...projects, project]);
            router.push(projectUrl)
        }
        catch (error) {
            setShowAlert(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="project-name" className="block text-sm font-medium text-gray-700">
                Project Name
            </label>
            <input
                type="text"
                name="project-name"
                id="project-name"
                placeholder={`Project ${projects.length + 1}`}
                value={projectName}
                onChange={handleProjectNameChange}
                className="mt-1 mb-4 p-2 w-full border border-gray-300 rounded-md"
            />
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
            </label>
            <textarea
                name="description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                className="mt-1 mb-4 p-2 w-full border border-gray-300 rounded-md"
            ></textarea>
            <button
                type="submit"
                className="bg-emerald-400 text-white px-4 py-2 rounded-md hover:bg-emerald-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
                Save Project
            </button>
            {showAlert && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mt-4 rounded relative" role="alert">
                    <strong className="font-bold mr-10">Project with that name already exists.</strong>
                    <button className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setShowAlert(false)}>
                        <span className="sr-only">Close</span>
                        <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}
        </form>
    );
}

export default CreateForm;