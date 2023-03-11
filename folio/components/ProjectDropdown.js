import { useState, useEffect } from "react";
import { pb } from "./UserAuthentication";

let change = false;
const ProjectDropdown = (props) => {
    const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		return null;
	}
    async function deleteProject() {
        await pb.collection('projects').delete(props.id);
    }
    return (
        <main className="h-screen">
            <div className="relative">
                <div className={`absolute right-2 mt-2 whitespace-nowrap w-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}>
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
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

