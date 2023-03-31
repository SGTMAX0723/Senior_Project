'use client'

import { IoNotifications } from "react-icons/io5";
import { IoIosSearch } from "react-icons/io";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { pb } from "./UserAuthentication";
import Default from '../public/Default_PFP.jpg'
import MenuDropdown from "./MenuDropdown";

const SearchBar = ({ icon }) => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      let filters = 'created >= "2022-01-01 00:00:00"';
      try {
        const userList = await pb.collection('users').getList(1, 100000, {
          filter: filters,
        });
        setUsers(userList.items);
      } catch (error) {
        console.error(error);
      }
    };
    
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchProjects = async () => {
      let filters = 'created >= "2022-01-01 00:00:00"';
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
  }, []);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);

  const handleInputChange = async (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    if (term.length > 2) { // Set minimum character length to 3
      setShowDropdown(true);
      const results = users.filter((user) => {
        return (user.username.toLowerCase().includes(term) || user.name.toLowerCase().includes(term)) && user.id;
      });
      const projectResults = projects.filter((project) => {
        return (project.project_name.toLowerCase().includes(term) && project.id);
      });
      setSearchResults([...results, ...projectResults]);
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  return (
    <main className="searchbar">
      <div className='searchbar-icon'>{icon}</div>
      <input
        className="bg-zinc-50 h-10 w-64 pl-3 text-sm focus:outline-none tracking-[.07em]"
        type='text'
        placeholder='Search users or projects'
        value={searchTerm}
        onChange={handleInputChange}
        ref={searchInputRef}
      />
      {showDropdown && (
        <div className='searchbar-dropdown absolute z-50 top-10 mt-[.813rem] max-h-64 overflow-auto opacity-90 left-0 w-full rounded-b-md bg-zinc-50 border-l-2 border-r-2 border-b-2 border-gray-200'>
          {searchResults.length === 0 && <div className='p-3 text-sm'>No results found</div>}
          {searchResults.length > 0 &&
            searchResults.map((result) => (
            <a href={`/accounts/${result.id}/profile`}>
              <div key={result.id} className='p-3'>
                <p className="text-sm truncate">
                  {result.username ? result.username : result.project_name}
                </p>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
};

const NavBarlogged = () => {
  const user = pb.authStore.model;
  const [isImageClicked, setIsImageClicked] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isImageClicked && !dropdownRef.current.contains(event.target)) {
        setIsImageClicked(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isImageClicked]);

  const handleImageClick = () => {
    setIsImageClicked(!isImageClicked);
  };

  const NavBarIcon = ({ icon, text }) => (
    <div className='navbar-icon'>
      {icon}
      {text}
    </div>
  );

  return(
    <main>
      <div className="fixed top-0 h-16 w-screen pl-48 justify-center items-center grid grid-cols-3 bg-zinc-50 text-zinc-50 border-b-2">
        <Link href='/templates' className="text-gray-800 
        grid justify-self-center 
        font-semibold text-s tracking-[.20em] 
        col-start-1">
          CREATE
          
        </Link>

        <div className="flex relative mx-auto text-zinc-500 xl:visible lg:visible md:invisible min-[0px]:invisible max-sm:invisible">
          {/* <input className="bg-zinc-50 h-10 w-64 pl-10 text-sm focus:outline-none tracking-[.07em]" type="search" name="search" placeholder="Search users or projects"/> */}
          {/* <button type="submit" className="absolute inset-y-0 left-0 mx-auto items-center">
            <SearchBar icon={<IoIosSearch size={20}/> } />
          </button> */}
          <SearchBar icon={<IoIosSearch size={20}/> } />
        </div>
        <div className="flex -space-x-2 col-start-3 justify-self-end pr-16 items-center">
          <NavBarIcon icon={<IoNotifications size={18}/> } text={<p className='pr-8'></p>}/>
          <p className="flex pr-8 text-secondary justify-center xl:visible lg:visible md:visible md:w-36 min-[0px]:invisible max-sm:invisible whitespace-nowrap overflow-hidden">{user.username}</p>
          <div className="h-11 w-11 rounded-full" ref={dropdownRef}>
            <button onClick={handleImageClick}>
              <img
                className="h-full w-full rounded-full"
                src={user.avatar?`https://folio-database.fly.dev/api/files/_pb_users_auth_/${user.id}/${user.avatar}`: Default}
              />
            </button>
            {isImageClicked && (
              <div className="dropdown-menu">
                <MenuDropdown />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default NavBarlogged;
