import React, { useState, useEffect, useRef } from 'react';
import { IoIosSearch } from "react-icons/io";
import  { pb } from 'components/UserAuthentication';

const SearchBarDashboard = () => {
    const [projects, setProjects] = useState([]);
    const user = pb.authStore.model;

    useEffect(() => {
        const fetchProjects = async () => {
        let filters = 'created >= "2022-01-01 00:00:00" && user_projects = "' + user.id + '"';
        try {
            const projectList = await pb.collection('projects').getList(1, 100000, {
            filter: filters,
            });
            setProjects(projectList.items);
        } catch (error) {
            console.error(error);
        }
        };

        fetchProjects();
    });

    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
        if (searchInputRef.current && !searchInputRef.current.contains(e.target)) {
            setShowDropdown(false);
        }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
        };
    });

    const handleInputChange = async (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        if (term.length > 2) { // Set minimum character length to 3
            setShowDropdown(true);
            const projectResults = projects.filter((project) => {
                return (project.project_name.toLowerCase().includes(term) && project.id);
            });
            setSearchResults(projectResults);
        } else {
            setShowDropdown(false);
            setSearchResults([]);
        }
    };

    return (
        <main className='w-full'>
        <input
            className="bg-zinc-50 h-10 w-full pl-4 rounded-md text-sm font-light focus:outline-none tracking-[.07em]"
            type='text'
            placeholder="Search projects"
            value={searchTerm}
            onChange={handleInputChange}
            ref={searchInputRef}
        />
        <button type="submit" className="flex absolute inset-y-0 right-0 mx-1 justify-center items-start pt-1.5 h-full">
            <IoIosSearch className='pr-2' size={28} />
        </button>
        {showDropdown && (
            <div className='searchbar-dropdown max-h-64 overflow-auto opacity-90 drop-shadow-md w-full mt-2 rounded-md bg-zinc-50'>
            {searchResults.length === 0 && <div className='p-3 text-sm'>No results found</div>}
            {searchResults.length > 0 &&
                searchResults.map((result) => (
                <a key={result.id} href={`/search/${result.id}`}>
                    <div className='p-3 hover:bg-zinc-200'>
                        <p className="text-sm">
                            {result.project_name}
                        </p>
                    </div>
                </a>
            ))}
            </div>
        )}
        </main>
    );
};

export default SearchBarDashboard;